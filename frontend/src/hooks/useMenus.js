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
    "to": "/arqueo-recaudacion",
    "label": "Arqueo Recaudación",
    "icon": "pi pi-money-bill",
    "iconcolor": "",
    "target": "",
  },
  {
    "to": "/actaentregacab",
    "label": "Actaentregacab",
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
  },
  {
    "to": "/actaentregadet",
    "label": "Actaentregadet",
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
  },
  {
    "to": "/arqueocab",
    "label": "Arqueocab",
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
  },
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
  {
    "to": "/roles",
    "label": "Roles",
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
  },
  {
    "to": "/tblarrendamientos",
    "label": "Tbl Arrendamientos",
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
  },
  {
    "to": "/tblarrendamientosdocumentos",
    "label": "Tbl Arrendamientos Documentos",
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
  },
  {
    "to": "/tbledificio",
    "label": "Tbl Edificio",
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
  },
  {
    "to": "/tbledificioambiente",
    "label": "Tbl Edificio Ambiente",
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
  },
  {
    "to": "/tbledificionivel",
    "label": "Tbl Edificio Nivel",
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
  },
  {
    "to": "/tbledificioseccion",
    "label": "Tbl Edificio Seccion",
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
  },
  {
    "to": "/tblfacturadetalle",
    "label": "Tbl Factura Detalle",
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
  },
  {
    "to": "/tblfacturas",
    "label": "Tbl Facturas",
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
  },
  {
    "to": "/tbloperadores",
    "label": "Tbl Operadores",
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
  },
  {
    "to": "/tblpagosarrendamientos",
    "label": "Tbl Pagos Arrendamientos",
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
    "to": "/tblprorrogasolicitudes",
    "label": "Tbl Prorroga Solicitudes",
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
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
  {
    "to": "/tblvehiculos",
    "label": "Tbl Vehiculos",
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
  },
  {
    "to": "/users",
    "label": "Users",
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
  }
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