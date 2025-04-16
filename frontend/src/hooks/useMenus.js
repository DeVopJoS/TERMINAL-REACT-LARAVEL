/**
 * @Category React Hook function
 * Provide single source to manage application static menus items
 * 
**/


export default function useMenus() {
    
    
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
//{
//    "to": "/arqueo-recaudacion",
//    "label": "Arqueo Recaudación",
//    "icon": "pi pi-money-bill",
//    "iconcolor": "",
//    "target": "",
//  },
//  {
//    "to": "cajas/registro/prevaloradas",
//    "label": "Registro de Prevaloradas",
//    "icon": "pi pi-money-bill",
//    "iconcolor": "",
//    "target": "",
//  },
//  {
//    "to": "/control-diario",
//    "label": "Control de Recaudación",
//    "icon": "pi pi-chart-line",
//    "iconcolor": "",
//    "target": "",
//  },
//  {
//   "to": "/actaentregadet",
//    "label": "Actaentregadet",
//    "icon": "pi pi-th-large",
//    "iconcolor": "",
//    "target": "",
//  },
/*
  {
    "to": "/arqueodetcortes",
    "label": "Arqueodetcortes",
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
  },
  {
    "to": "/arqueorecaudacioncab",
    "label": "Arqueorecaudacioncab",
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
  },
  {
    "to": "/arqueorecaudaciondet",
    "label": "Arqueorecaudaciondet",
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
  },
  */
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