/**
 * @Category React Hook function
 * Provide single source to manage application static menus items
 * 
**/

import React from 'react';
import { useState, useEffect } from 'react';
import useApi from './useApi';

export default function useMenus() {
    const [dynamicMenus, setDynamicMenus] = useState([]);
    const api = useApi();

    useEffect(() => {
        loadMenusFromDb();
    }, []);

    const isIconImage = (iconValue) => {
        return typeof iconValue === 'string' && 
            (iconValue.startsWith('http') || 
             iconValue.startsWith('/storage/'));
    };

    const ImageIcon = ({ src }) => {
        return (
            <img 
                src={src} 
                alt="" 
                style={{ 
                    width: '18px', 
                    height: '18px', 
                    verticalAlign: 'middle',
                    marginRight: '5px',
                    display: 'inline-block'
                }} 
            />
        );
    };

    const processMenuIcon = (iconValue) => {
        return iconValue;
    };

    const processIconsRecursive = (nodes) => {
        if (!Array.isArray(nodes)) return;
        nodes.forEach(node => {
            const originalIcon = node.originalData?.me_icono;
            node.icon = originalIcon; 
            
            if (isIconImage(originalIcon)) {
                node.iconType = 'image';
            } else {
                node.iconType = 'class';
            }
            
            if (node.items && node.items.length > 0) {
                processIconsRecursive(node.items);
            }
        });
    };

    const loadMenusFromDb = async () => {
        try {
            const response = await api.get('tblsegmenu');
            const menus = response.data || [];
            const processedMenus = processMenus(menus);
            setDynamicMenus(processedMenus);
        } catch (error) {
            console.error("Error loading menus:", error);
        }
    };

    const processMenus = (menus) => {
        if (!Array.isArray(menus)) {
            return [];
        }
        
        const activeMenus = menus.filter(menu => menu.me_estado === 'V');
        const menuMap = {};
        activeMenus.forEach(menu => {
            menuMap[menu.me_id] = {
                originalData: menu, 
                key: menu.me_id.toString(), 
                to: menu.me_url || undefined,
                label: menu.me_descripcion,
                icon: menu.me_icono, 
                items: undefined 
            };
        });

        const result = [];
        activeMenus.forEach(menu => {
            const menuItem = menuMap[menu.me_id];
            const parentId = menu.me_id_padre === null ? 0 : menu.me_id_padre;

            if (parentId === 0) {
                result.push(menuItem);
            } else if (menuMap[parentId]) {
                if (!menuMap[parentId].items) {
                    menuMap[parentId].items = [];
                }
                menuMap[parentId].items.push(menuItem);
            } else {
                 result.push(menuItem); 
            }
        });

        const finalizeNodes = (nodes) => {
            if (!nodes || !Array.isArray(nodes)) return;
            
            nodes.forEach(node => {
                if (node.items && node.items.length > 0) {
                    node.to = undefined;
                    finalizeNodes(node.items); 
                } else {
                    node.items = undefined; 
                }
            });
        };
        finalizeNodes(result);
        result.sort((a, b) => (a.originalData?.me_orden || 0) - (b.originalData?.me_orden || 0));
        
        const sortChildrenByOrder = (nodes) => {
             if (!nodes || !Array.isArray(nodes)) return;
             nodes.forEach(node => {
                 if (node.items && node.items.length > 0) {
                     node.items.sort((a, b) => (a.originalData?.me_orden || 0) - (b.originalData?.me_orden || 0));
                     sortChildrenByOrder(node.items);
                 }
             });
        };
        sortChildrenByOrder(result);
        processIconsRecursive(result);

        return result;
    };
    
    return {
        navbarTopRight: [],
        navbarTopLeft: [],
        navbarSideLeft: [
  {
    "to": "/home",
    "label": "Home",
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
  },
  {
    "label": "Movimiento de Cajas",
    "icon": "pi pi-box",
    "items": [
      {
        "to": "/tblactas/view",
        "label": "Elab.Acta Entrega",
        "icon": "pi pi-file-edit",
        "iconcolor": "",
        "target": ""
      },
      {
        "to": "/actaentregacab",
        "label": "Reg.Prevaloradas",
        "icon": "pi pi-ticket",
        "iconcolor": "",
        "target": ""
      },
      {
        "to": "/arqueocab",
        "label": "Arqueo Cajas",
        "icon": "pi pi-calculator",
        "iconcolor": "",
        "target": ""
      }
    ]
  },
  {
    "label": "Arrendamientos",
    "icon": "pi pi-briefcase",
    "items": [
      {
        "to": "/tblarrendamientos",
        "label": "Arrendamientos",
        "icon": "pi pi-file-contract",
        "iconcolor": "",
        "target": ""
      },
      {
        "to": "/tblarrendamientosdocumentos",
        "label": "Arrendamientos Documentos",
        "icon": "pi pi-folder",
        "iconcolor": "",
        "target": ""
      },
      {
        "to": "/tblprorrogasolicitudes",
        "label": "Solicitud de Prorrogas",
        "icon": "pi pi-th-large",
        "iconcolor": "",
        "target": ""
      }
    ]
  },
  {
    "label": "Maestro Parametrizadas",
    "icon": "pi pi-cog",
    "items": [
      {
        "to": "/tbledificio",
        "label": "Tbl Edificio",
        "icon": "pi pi-building",
        "iconcolor": "",
        "target": ""
      },
      {
        "to": "/tbledificioambiente",
        "label": "Tbl Edificio Ambiente",
        "icon": "pi pi-home",
        "iconcolor": "",
        "target": ""
      },
      {
        "to": "/tbledificionivel",
        "label": "Tbl Edificio Nivel",
        "icon": "pi pi-sort",
        "iconcolor": "",
        "target": ""
      },
      {
        "to": "/tbledificioseccion",
        "label": "Tbl Edificio Seccion",
        "icon": "pi pi-table",
        "iconcolor": "",
        "target": ""
      },
      {
        "to": "/tblpuntosrecaudacion",
        "label": "Tbl Puntos Recaudacion",
        "icon": "pi pi-th-large",
        "iconcolor": "",
        "target": "",
      },
      {
        "to": "/tblservicios",
        "label": "Tbl Servicios",
        "icon": "pi pi-th-large",
        "iconcolor": "",
        "target": "",
      },
    ]
  },
  {
    "label": "Gestión de Facturas",
    "icon": "pi pi-file-invoice",
    "items": [
      {
        "to": "/tblfacturadetalle",
        "label": "Tbl Factura Detalle",
        "icon": "pi pi-list",
        "iconcolor": "",
        "target": ""
      },
      {
        "to": "/tblfacturas",
        "label": "Tbl Facturas",
        "icon": "pi pi-file",
        "iconcolor": "",
        "target": ""
      }
    ]
  },
  {
    "to": "/tbloperadores",
    "label": "Tbl Operadores",
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
  },

  {
    "to": "/tblpagosparquimetro",
    "label": "Tbl Pagos Parquimetro",
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
  },
  {
    "to": "/tblparquimetros",
    "label": "Tbl Parquimetros",
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
  },

  {
    "to": "/tblvehiculos",
    "label": "Tbl Vehiculos",
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
  },
  {
    "label": "Gestión de Usuarios",
    "icon": "pi pi-users",
    "items": [
      {
        "to": "/roles",
        "label": "Roles",
        "icon": "pi pi-id-card",
        "iconcolor": "",
        "target": ""
      },
      {
        "to": "/users",
        "label": "Users",
        "icon": "pi pi-user",
        "iconcolor": "",
        "target": ""
      }
    ]
  },
  {
    "to": "/importacion",
    "label": "Centro de importaciones",
    "icon": "pi pi-database",
    "iconcolor": "",
    "target": "",
  },
  {
    "to": "/panelMenus",
    "label": "Configuración de Menus",
    "icon": "pi pi-bars",
    "iconcolor": "",
    "target": "",
  },
            ...dynamicMenus
        ],
        exportFormats: {
            print: {
                label: 'Print',
                icon: 'pi pi-print',
                type: 'print',
                ext: '',
            },
            pdf: {
                label: 'Pdf',
                icon: 'pi pi-file-pdf',
                type: 'pdf',
                ext: 'pdf',
            },
            excel: {
                label: 'Excel',
                icon: 'pi pi-file-excel',
                type: 'excel',
                ext: 'xlsx',
            },
            csv: {
                label: 'Csv',
                icon: 'pi pi-table',
                type: 'csv',
                ext: 'csv',
            },
        },
    }
}