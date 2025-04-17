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
import { FileUpload } from 'primereact/fileupload';
import { Divider } from 'primereact/divider';

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
    const fileUploadRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [iconType, setIconType] = useState('primereact');

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

    const isIconImage = (iconValue) => {
        return typeof iconValue === 'string' && 
            (iconValue.startsWith('http') || 
             iconValue.startsWith('/storage/'));
    };

    const renderIcon = (iconValue) => {
        if (isIconImage(iconValue)) {
            return (
                <img
                    src={iconValue}
                    alt="Icono"
                    style={{
                        width: '1.5rem',
                        height: '1.5rem',
                        marginRight: '8px',
                        objectFit: 'contain',
                        verticalAlign: 'middle'
                    }}
                />
            );
        }
        const iconClass = iconValue || 'pi pi-th-large';
        return <i className={iconClass} style={{fontSize: '1.5rem', marginRight: '8px', verticalAlign: 'middle'}}></i>;
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
        setSelectedFile(null);
        setIconType('primereact');
        if (fileUploadRef.current) {
            fileUploadRef.current.clear();
        }
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
        
        if (isIconImage(node.data.me_icono)) {
            setIconType('custom');
        } else {
            setIconType('primereact');
        }
        
        setSelectedFile(null);
        if (fileUploadRef.current) {
            fileUploadRef.current.clear();
        }
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
            
            const formData = new FormData();
            
            Object.keys(menuData).forEach(key => {
                if (key !== 'me_icono' || !selectedFile) {
                    formData.append(key, menuData[key]);
                }
            });
            
            if (selectedFile) {
                formData.append('icon_file', selectedFile);
            }
            
            let response;
            if (isEdit) {
                response = await api.axios()({
                    method: 'post',
                    url: `tblsegmenu/edit/${menuData.me_id}`, 
                    data: formData,
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                
                toast.current.show({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Menú actualizado correctamente'
                });
            } else {
                response = await api.axios()({
                    method: 'post',
                    url: 'tblsegmenu/add',
                    data: formData,
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                
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
        { label: 'Default', value: 'pi pi-th-large'},
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
        { label: 'Info', value: 'pi pi-info-circle' },
        { label: 'Star', value: 'pi pi-star' },
        { label: 'Trash', value: 'pi pi-trash' },
        { label: 'Plus', value: 'pi pi-plus' },
        { label: 'Minus', value: 'pi pi-minus' },
        { label: 'Check', value: 'pi pi-check' },
        { label: 'Times', value: 'pi pi-times' },
        { label: 'Lock', value: 'pi pi-lock' },
        { label: 'Download', value: 'pi pi-download' },
        { label: 'Upload', value: 'pi pi-upload' },
        { label: 'Print', value: 'pi pi-print' },
        { label: 'Flag', value: 'pi pi-flag' },
        { label: 'Tag', value: 'pi pi-tag' },
        { label: 'Bell', value: 'pi pi-bell' }
    ];
    
    const onFileSelect = (e) => {
        if (e.files && e.files.length > 0) {
            setSelectedFile(e.files[0]);
        }
    };
    
    const onFileRemove = () => {
        setSelectedFile(null);
    };

    const nodeTemplate = (node) => {
        const iconElement = renderIcon(node.data?.me_icono);
        return (
            <span className="flex align-items-center">
                {iconElement}
                {node.label}
            </span>
        );
    };

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
                    <div className="flex justify-content-start align-items-center gap-2 mb-4">
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
                        nodeTemplate={nodeTemplate} 
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
                                <div className="flex align-items-center">
                                    {isIconImage(selectedNode.data.me_icono) ? (
                                        <img 
                                            src={selectedNode.data.me_icono} 
                                            alt="Icono personalizado" 
                                            style={{width: '1.5rem', height: '1.5rem', marginRight: '8px', objectFit: 'contain', verticalAlign: 'middle'}}
                                        />
                                    ) : (
                                        <i className={selectedNode.data.me_icono} style={{fontSize: '1.5rem', marginRight: '8px', verticalAlign: 'middle'}}></i>
                                    )}
                                    {isIconImage(selectedNode.data.me_icono) ? 'Imagen personalizada' : selectedNode.data.me_icono}
                                </div>
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
                            placeholder="Ej: /modulo/pagina"
                        />
                        <small className="text-muted">Deje en blanco para menús que solo contienen submenús</small>
                    </div>
                    
                    <div className="col-12 mb-2">
                        <label className="font-bold block mb-2">Tipo de Icono</label>
                        <div className="flex mb-3">
                            <div className="field-radiobutton mr-4">
                                <RadioButton 
                                    inputId="icono-primereact" 
                                    value="primereact" 
                                    name="icon-type" 
                                    checked={iconType === 'primereact'}
                                    onChange={() => setIconType('primereact')} 
                                />
                                <label htmlFor="icono-primereact" className="ml-2">Iconos PrimeReact</label>
                            </div>
                            <div className="field-radiobutton">
                                <RadioButton 
                                    inputId="icono-personalizado" 
                                    value="custom" 
                                    name="icon-type" 
                                    checked={iconType === 'custom'}
                                    onChange={() => setIconType('custom')} 
                                />
                                <label htmlFor="icono-personalizado" className="ml-2">Imagen Personalizada</label>
                            </div>
                        </div>
                        
                        {iconType === 'primereact' && (
                            <div>
                                <label htmlFor="me_icono" className="font-bold">Seleccionar Icono</label>
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
                        )}
                        
                        {iconType === 'custom' && (
                            <div>
                                <label htmlFor="icon_file" className="font-bold">Subir Imagen de Icono</label>
                                <FileUpload
                                    ref={fileUploadRef}
                                    name="icon_file"
                                    accept="image/*"
                                    maxFileSize={5000000}
                                    onSelect={onFileSelect}
                                    onClear={onFileRemove}
                                    emptyTemplate={<p className="m-0">Arrastre y suelte una imagen aquí o haga clic para seleccionar.</p>}
                                    chooseLabel="Seleccionar"
                                    cancelLabel="Cancelar"
                                    mode="basic"
                                    className="w-full"
                                />
                                <small className="text-muted">Formatos: JPG, PNG, GIF. Tamaño máximo: 5MB</small>
                                
                                {isEdit && isIconImage(menuData.me_icono) && !selectedFile && (
                                    <div className="mt-2">
                                        <label className="font-bold block">Icono actual:</label>
                                        <div className="flex align-items-center mt-1">
                                            <img src={menuData.me_icono} alt="Icono actual" style={{width: '30px', height: '30px', marginRight: '8px'}} />
                                            <span>Imagen personalizada</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
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
