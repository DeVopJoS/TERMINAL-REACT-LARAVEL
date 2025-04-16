import React, { useState, useEffect, useRef } from 'react';
import { Tree } from 'primereact/tree';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';
import { ContextMenu } from 'primereact/contextmenu';
import { confirmDialog } from 'primereact/confirmdialog';
import useApi from 'hooks/useApi';
import { Card } from 'primereact/card';
import { RadioButton } from 'primereact/radiobutton';

export default function MenuList() {
    const [nodes, setNodes] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selectedNode, setSelectedNode] = useState(null);
    const [selectedNodeKey, setSelectedNodeKey] = useState(null);
    const [expandedKeys, setExpandedKeys] = useState({}); 
    const api = useApi();
    const [menus, setMenus] = useState([]);
    const [menuData, setMenuData] = useState({
        me_descripcion: '',
        me_url: '',
        me_icono: 'pi pi-th-large',
        me_id_padre: 0,
        me_estado: 'V',
        me_vista: 1,
        me_orden: 1
    });
    const [isEdit, setIsEdit] = useState(false);
    const toast = useRef(null);
    const cm = useRef(null);

    /**
     * Busca un nodo en un árbol por su key
     * @param {Array} nodes - Array de nodos del árbol
     * @param {String|Number} key - Clave a buscar
     * @returns {Object|null} - El nodo encontrado o null
     */
    const findNodeByKey = (nodesToSearch, key) => {
        if (!nodesToSearch || !Array.isArray(nodesToSearch) || nodesToSearch.length === 0) {
            return null;
        }

        const searchKey = String(key);
        if (searchKey === '0') { 
            return null;
        }

        for (let node of nodesToSearch) {
            if (String(node.key) === searchKey) {
                return node;
            }

            if (node.children && node.children.length > 0) { 
                const found = findNodeByKey(node.children, searchKey);
                if (found) {
                    return found;
                }
            }
        }

        return null;
    };

    useEffect(() => {
        loadMenus();
    }, []);

    const loadMenus = async () => {
        try {
            const response = await api.get('tblsegmenu');
            if (response.data && Array.isArray(response.data)) {
                const menusList = response.data;
                setMenus(menusList);
                const treeNodes = convertToTreeNodes(menusList);
                setNodes(treeNodes);
            } else {
                toast.current.show({
                    severity: 'error',
                    summary: 'Error de formato',
                    detail: 'Los datos recibidos no tienen el formato esperado'
                });
            }
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al cargar los menús'
            });
        }
    };

    const convertToTreeNodes = (menus) => {
        if (!menus || !Array.isArray(menus)) {
            return [];
        }

        const menuMap = {};
        menus.forEach(menu => {
            menuMap[menu.me_id] = {
                key: menu.me_id.toString(),
                label: menu.me_descripcion,
                icon: menu.me_icono,
                data: menu,
                children: [],
                style: menu.me_estado === 'C' ? { color: '#aaa', textDecoration: 'line-through' } : {}
            };
        });

        const tree = [];
        menus.forEach(menu => {
            const parentId = menu.me_id_padre === null ? 0 : menu.me_id_padre;
            
            if (parentId === 0) {
                tree.push(menuMap[menu.me_id]);
            } else if (menuMap[parentId]) {
                menuMap[parentId].children.push(menuMap[menu.me_id]);
            } else {
                tree.push(menuMap[menu.me_id]);
            }
        });

        return tree;
    };

    const findAllKeys = (nodesToSearch) => {
        let keys = {};
        if (!nodesToSearch || nodesToSearch.length === 0) {
            return keys;
        }
        nodesToSearch.forEach(node => {
            keys[node.key] = true;
            if (node.children && node.children.length > 0) {
                keys = { ...keys, ...findAllKeys(node.children) };
            }
        });
        return keys;
    };

    const expandAll = () => {
        const allKeys = findAllKeys(nodes);
        setExpandedKeys(allKeys);
    };

    const collapseAll = () => {
        setExpandedKeys({});
    };

    const handleAdd = (parentId = 0) => {
        setIsEdit(false);
        setMenuData({
            me_descripcion: '',
            me_url: '',
            me_icono: 'pi pi-th-large',
            me_id_padre: parentId ?? 0,
            me_estado: 'V',
            me_vista: 1,
            me_orden: 1
        });
        setVisible(true);
    };

    const handleEdit = (node) => {
        if (!node || !node.data) {
            toast.current.show({ severity: 'warn', summary: 'Error', detail: 'No se pudo encontrar el nodo para editar.' });
            return;
        }
        setIsEdit(true);
        setMenuData({
            ...node.data,
            me_id_padre: node.data.me_id_padre || 0
        });
        setVisible(true);
    };

    const handleSave = async () => {
        try {
            if (!menuData.me_descripcion) {
                toast.current.show({
                    severity: 'warn',
                    summary: 'Campo requerido',
                    detail: 'La descripción es obligatoria'
                });
                return;
            }
            
            if (isEdit) {
                const response = await api.put(`tblsegmenu/edit/${menuData.me_id}`, menuData);
                toast.current.show({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Menú actualizado correctamente'
                });
            } else {
                const response = await api.post('tblsegmenu/add', menuData);
                toast.current.show({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Menú guardado correctamente'
                });
            }
            
            setVisible(false);
            setSelectedNode(null);
            setSelectedNodeKey(null);
            loadMenus();
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al guardar el menú: ' + (error.response?.data?.message || error.message)
            });
        }
    };

    const handleDelete = async (nodeId) => {
        try {
            await api.delete(`tblsegmenu/delete/${nodeId}`);
            toast.current.show({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Menú eliminado correctamente'
            });
            if (selectedNode && selectedNode.data.me_id === nodeId) {
                setSelectedNode(null);
                setSelectedNodeKey(null);
            }
            loadMenus();
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al eliminar el menú: ' + (error.response?.data?.message || error.message)
            });
        }
    };

    const confirmDeleteMenu = (nodeId) => {
        if (!nodeId) {
             toast.current.show({ severity: 'warn', summary: 'Error', detail: 'No se pudo identificar el menú a eliminar.' });
             return;
        }
        confirmDialog({
            message: '¿Está seguro que desea eliminar este menú?',
            header: 'Confirmación de eliminación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí',
            rejectLabel: 'No',
            acceptClassName: 'p-button-danger',
            accept: () => handleDelete(nodeId)
        });
    };

    const toggleMenuStatus = async (node) => {
        if (!node || !node.data) {
            toast.current.show({ severity: 'warn', summary: 'Error', detail: 'No se pudo encontrar el nodo para cambiar estado.' });
            return;
        }
        try {
            const newStatus = node.data.me_estado === 'V' ? 'C' : 'V';
            await api.put(`tblsegmenu/edit/${node.data.me_id}`, {
                ...node.data,
                me_estado: newStatus
            });
            
            toast.current.show({
                severity: 'success',
                summary: 'Éxito',
                detail: `Menú ${newStatus === 'V' ? 'activado' : 'desactivado'} correctamente`
            });
            
            loadMenus();
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al cambiar estado del menú'
            });
        }
    };

    const handleSelection = (keyObject) => {
        let normalizedKeyObject = keyObject;
        
        if (typeof keyObject === 'string' || typeof keyObject === 'number') {
            normalizedKeyObject = { [keyObject]: true };
        }
        
        setSelectedNodeKey(normalizedKeyObject);
        
        if (!normalizedKeyObject || Object.keys(normalizedKeyObject).length === 0) {
            setSelectedNode(null);
            return;
        }
        
        const key = Object.keys(normalizedKeyObject)[0];
        
        if (key === '0') {
            setSelectedNode(null);
            return;
        }
        
        const node = findNodeByKey(nodes, key);
        if (node) {
            setSelectedNode(node);
        } else {
            setSelectedNode(null);
        }
    };

    const addChildMenu = () => {
        if (selectedNode && selectedNode.data && selectedNode.data.me_id) {
            const parentId = parseInt(selectedNode.data.me_id);
            handleAdd(parentId);
        } else {
            toast.current.show({
                severity: 'warn',
                summary: 'Selección requerida',
                detail: 'Por favor, seleccione un menú válido primero para agregarle un submenú.'
            });
        }
    };

    const menuModel = [
        {
            label: 'Editar',
            icon: 'pi pi-pencil',
            command: () => selectedNode && handleEdit(selectedNode),
            disabled: !selectedNode
        },
        {
            label: 'Agregar Submenú',
            icon: 'pi pi-plus',
            command: () => selectedNode && addChildMenu(),
            disabled: !selectedNode
        },
        {
            label: 'Cambiar Estado',
            icon: 'pi pi-eye-slash',
            command: () => selectedNode && toggleMenuStatus(selectedNode),
            disabled: !selectedNode
        },
        {
            label: 'Eliminar',
            icon: 'pi pi-trash',
            className: 'p-button-danger',
            command: () => selectedNode && confirmDeleteMenu(selectedNode.data.me_id),
            disabled: !selectedNode
        }
    ];

    const iconOptions = [
        { label: 'Home', value: 'pi pi-home' },
        { label: 'User', value: 'pi pi-user' },
        { label: 'Settings', value: 'pi pi-cog' },
        { label: 'Box', value: 'pi pi-box' },
        { label: 'Database', value: 'pi pi-database' },
        { label: 'File', value: 'pi pi-file' },
        { label: 'Menu', value: 'pi pi-bars' },
        { label: 'List', value: 'pi pi-list' },
        { label: 'Chart', value: 'pi pi-chart-bar' },
        { label: 'Calendar', value: 'pi pi-calendar' },
        { label: 'Envelope', value: 'pi pi-envelope' },
        { label: 'Search', value: 'pi pi-search' },
        { label: 'Default', value: 'pi pi-th-large' }
    ];

    return (
        <div className="grid">
            <Toast ref={toast} />
            <ContextMenu model={menuModel} ref={cm} onHide={() => handleSelection(null)} /> 
            
            <div className="col-12">
                <div className="card">
                    <h5>Configuración de Menús</h5>
                    <p>Utilice esta herramienta para crear y gestionar la estructura de menús de la aplicación.</p>
                </div>
            </div>
            
            <div className="col-8">
                <Card title="Estructura de Menús" className="h-full">
                    <div className="flex justify-content-start align-items-center gap-2 mb-4"> {/* Use gap and align-items */}
                        <Button 
                            label="Agregar Menú Principal" 
                            icon="pi pi-plus" 
                            onClick={() => handleAdd(0)} 
                            className="p-button-primary"
                        />
                        <Button
                            label="Expandir Todo"
                            icon="pi pi-plus"
                            onClick={expandAll}
                            className="p-button-secondary p-button-outlined p-button-sm"
                            disabled={nodes.length === 0}
                        />
                        <Button
                            label="Contraer Todo"
                            icon="pi pi-minus"
                            onClick={collapseAll}
                            className="p-button-secondary p-button-outlined p-button-sm"
                            disabled={nodes.length === 0}
                        />
                    </div>
                    
                    <Tree 
                        value={nodes} 
                        selectionMode="single" 
                        selectionKeys={selectedNodeKey} 
                        onSelectionChange={(e) => handleSelection(e.value)} 
                        onContextMenu={(e) => {
                            handleSelection({ [e.node.key]: true }); 
                            cm.current.show(e.originalEvent);
                        }}
                        contextMenuSelectionKey={selectedNodeKey} 
                        expandedKeys={expandedKeys}
                        onToggle={(e) => setExpandedKeys(e.value)} 
                        className="w-full h-30rem overflow-y-auto"
                        filter
                        filterMode="strict"
                        filterPlaceholder="Buscar menú..."
                    />

                    {nodes && nodes.length > 0 && !selectedNode && (
                        <div className="text-center mt-3 p-3 border-round surface-100">
                            <i className="pi pi-info-circle text-blue-500 mr-2"></i>
                            Haga clic en un menú en el árbol para ver detalles o agregar submenús.
                        </div>
                    )}
                </Card>
            </div>
            
            <div className="col-4">
                <Card title="Detalles del Menú" className="h-full">
                    {selectedNode ? (
                        <div>
                            <div className="field">
                                <label className="font-bold">Descripción:</label>
                                <div>{selectedNode.data.me_descripcion}</div>
                            </div>
                            <div className="field">
                                <label className="font-bold">URL:</label>
                                <div>{selectedNode.data.me_url || '(Sin URL)'}</div>
                            </div>
                            <div className="field">
                                <label className="font-bold">Icono:</label>
                                <div><i className={selectedNode.data.me_icono} style={{fontSize: '1.5rem', marginRight: '8px'}}></i> {selectedNode.data.me_icono}</div>
                            </div>
                            <div className="field">
                                <label className="font-bold">Estado:</label>
                                <div>{selectedNode.data.me_estado === 'V' ? 'Activo' : 'Desactivado'}</div>
                            </div>
                            
                            <div className="flex justify-content-end mt-4">
                                <Button 
                                    icon="pi pi-plus-circle" 
                                    label="Agregar Submenú" 
                                    className="p-button-success p-button-text mr-2" 
                                    onClick={addChildMenu} 
                                    disabled={!selectedNode} 
                                />
                                <Button 
                                    icon="pi pi-pencil" 
                                    label="Editar" 
                                    className="p-button-text mr-2" 
                                    onClick={() => handleEdit(selectedNode)} 
                                />
                                <Button 
                                    icon="pi pi-trash" 
                                    label="Eliminar" 
                                    className="p-button-danger p-button-text" 
                                    onClick={() => confirmDeleteMenu(selectedNode.data.me_id)} 
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="text-center p-4 text-500">
                            <i className="pi pi-arrow-left text-xl mb-3"></i>
                            <p>Seleccione un menú para ver sus detalles</p>
                        </div>
                    )}
                </Card>
            </div>

            <Dialog 
                header={isEdit ? "Editar Menú" : "Nuevo Menú"} 
                visible={visible} 
                onHide={() => setVisible(false)}
                style={{ width: '500px' }}
                modal
                footer={
                    <div>
                        <Button label="Cancelar" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
                        <Button label="Guardar" icon="pi pi-check" onClick={handleSave} autoFocus />
                    </div>
                }
            >
                <div className="grid p-fluid">
                    <div className="col-12 mb-2">
                        <label htmlFor="me_descripcion" className="font-bold">Descripción*</label>
                        <InputText 
                            id="me_descripcion"
                            value={menuData.me_descripcion || ''}
                            onChange={(e) => setMenuData({...menuData, me_descripcion: e.target.value})}
                            required
                            className="w-full"
                            placeholder="Ingrese el nombre del menú"
                        />
                    </div>
                    
                    <div className="col-12 mb-2">
                        <label htmlFor="me_url" className="font-bold">URL</label>
                        <InputText 
                            id="me_url"
                            value={menuData.me_url || ''}
                            onChange={(e) => setMenuData({...menuData, me_url: e.target.value})}
                            className="w-full"
                            placeholder="Ej: /pagina o /modulo/pagina"
                        />
                        <small className="text-muted">Deje en blanco para menús que solo contienen submenús</small>
                    </div>
                    
                    <div className="col-12 mb-2">
                        <label htmlFor="me_icono" className="font-bold">Icono</label>
                        <Dropdown
                            id="me_icono"
                            value={menuData.me_icono || 'pi pi-th-large'}
                            options={iconOptions}
                            onChange={(e) => setMenuData({...menuData, me_icono: e.value})}
                            optionLabel="label"
                            className="w-full"
                            itemTemplate={(option) => option ? (
                                <div className="flex align-items-center">
                                    <i className={option.value} style={{fontSize: '1.25rem', marginRight: '8px'}}></i>
                                    {option.label}
                                </div>
                            ) : null}
                            valueTemplate={(option) => option ? (
                                <div className="flex align-items-center">
                                    <i className={option.value || menuData.me_icono} style={{fontSize: '1.25rem', marginRight: '8px'}}></i>
                                    {option.label || menuData.me_icono} 
                                </div>
                            ) : null}
                        />
                    </div>
                    
                    <div className="col-12 mb-2">
                        <label className="font-bold block mb-2">Estado</label>
                        <div className="flex">
                            <div className="field-radiobutton mr-4">
                                <RadioButton 
                                    inputId="estado-activo" 
                                    value="V" 
                                    name="me_estado" 
                                    checked={menuData.me_estado === 'V'}
                                    onChange={() => setMenuData({...menuData, me_estado: 'V'})} 
                                />
                                <label htmlFor="estado-activo" className="ml-2">Activo</label>
                            </div>
                            <div className="field-radiobutton">
                                <RadioButton 
                                    inputId="estado-inactivo" 
                                    value="C" 
                                    name="me_estado" 
                                    checked={menuData.me_estado === 'C'}
                                    onChange={() => setMenuData({...menuData, me_estado: 'C'})} 
                                />
                                <label htmlFor="estado-inactivo" className="ml-2">Inactivo</label>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
