import { Routes, Route, Navigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';

import IndexLayout from 'layouts/IndexLayout';
import MainLayout from 'layouts/MainLayout';
import AuthRoutes from 'components/AuthRoutes';
import IndexPage from 'pages/index/IndexPage';
import ActaentregacabList from 'pages/actaentregacab/List';
import ActaentregacabView from 'pages/actaentregacab/View';
import ActaentregacabAdd from 'pages/actaentregacab/Add';
import ActaentregacabEdit from 'pages/actaentregacab/Edit';
import ActaentregadetList from 'pages/actaentregadet/List';
import ActaentregadetView from 'pages/actaentregadet/View';
import ActaentregadetAdd from 'pages/actaentregadet/Add';
import ActaentregadetEdit from 'pages/actaentregadet/Edit';
import ArqueocabList from 'pages/arqueocab/List';
import ArqueocabView from 'pages/arqueocab/View';
import ArqueocabAdd from 'pages/arqueocab/Add';
import ArqueocabEdit from 'pages/arqueocab/Edit';
import ArqueodetcortesList from 'pages/arqueodetcortes/List';
import ArqueodetcortesView from 'pages/arqueodetcortes/View';
import ArqueodetcortesAdd from 'pages/arqueodetcortes/Add';
import ArqueodetcortesEdit from 'pages/arqueodetcortes/Edit';
import ArqueorecaudacioncabList from 'pages/arqueorecaudacioncab/List';
import ArqueorecaudacioncabView from 'pages/arqueorecaudacioncab/View';
import ArqueorecaudacioncabAdd from 'pages/arqueorecaudacioncab/Add';
import ArqueorecaudacioncabEdit from 'pages/arqueorecaudacioncab/Edit';
import ArqueorecaudaciondetList from 'pages/arqueorecaudaciondet/List';
import ArqueorecaudaciondetView from 'pages/arqueorecaudaciondet/View';
import ArqueorecaudaciondetAdd from 'pages/arqueorecaudaciondet/Add';
import ArqueorecaudaciondetEdit from 'pages/arqueorecaudaciondet/Edit';
import RolesList from 'pages/roles/List';
import RolesView from 'pages/roles/View';
import RolesAdd from 'pages/roles/Add';
import RolesEdit from 'pages/roles/Edit';
import TblarrendamientosList from 'pages/tblarrendamientos/List';
import TblarrendamientosView from 'pages/tblarrendamientos/View';
import TblarrendamientosAdd from 'pages/tblarrendamientos/Add';
import TblarrendamientosEdit from 'pages/tblarrendamientos/Edit';
import TblarrendamientosdocumentosList from 'pages/tblarrendamientosdocumentos/List';
import TblarrendamientosdocumentosView from 'pages/tblarrendamientosdocumentos/View';
import TblarrendamientosdocumentosAdd from 'pages/tblarrendamientosdocumentos/Add';
import TblarrendamientosdocumentosEdit from 'pages/tblarrendamientosdocumentos/Edit';
import TbledificioList from 'pages/tbledificio/List';
import TbledificioView from 'pages/tbledificio/View';
import TbledificioAdd from 'pages/tbledificio/Add';
import TbledificioEdit from 'pages/tbledificio/Edit';
import TbledificioambienteList from 'pages/tbledificioambiente/List';
import TbledificioambienteView from 'pages/tbledificioambiente/View';
import TbledificioambienteAdd from 'pages/tbledificioambiente/Add';
import TbledificioambienteEdit from 'pages/tbledificioambiente/Edit';
import TbledificionivelList from 'pages/tbledificionivel/List';
import TbledificionivelView from 'pages/tbledificionivel/View';
import TbledificionivelAdd from 'pages/tbledificionivel/Add';
import TbledificionivelEdit from 'pages/tbledificionivel/Edit';
import TbledificioseccionList from 'pages/tbledificioseccion/List';
import TbledificioseccionView from 'pages/tbledificioseccion/View';
import TbledificioseccionAdd from 'pages/tbledificioseccion/Add';
import TbledificioseccionEdit from 'pages/tbledificioseccion/Edit';
import TblfacturadetalleList from 'pages/tblfacturadetalle/List';
import TblfacturadetalleView from 'pages/tblfacturadetalle/View';
import TblfacturadetalleAdd from 'pages/tblfacturadetalle/Add';
import TblfacturadetalleEdit from 'pages/tblfacturadetalle/Edit';
import TblfacturasList from 'pages/tblfacturas/List';
import TblfacturasView from 'pages/tblfacturas/View';
import TblfacturasAdd from 'pages/tblfacturas/Add';
import TblfacturasEdit from 'pages/tblfacturas/Edit';
import TbloperadoresList from 'pages/tbloperadores/List';
import TbloperadoresView from 'pages/tbloperadores/View';
import TbloperadoresAdd from 'pages/tbloperadores/Add';
import TbloperadoresEdit from 'pages/tbloperadores/Edit';
import TblpagosarrendamientosList from 'pages/tblpagosarrendamientos/List';
import TblpagosarrendamientosView from 'pages/tblpagosarrendamientos/View';
import TblpagosarrendamientosAdd from 'pages/tblpagosarrendamientos/Add';
import TblpagosarrendamientosEdit from 'pages/tblpagosarrendamientos/Edit';
import TblpagosparquimetroList from 'pages/tblpagosparquimetro/List';
import TblpagosparquimetroView from 'pages/tblpagosparquimetro/View';
import TblpagosparquimetroAdd from 'pages/tblpagosparquimetro/Add';
import TblpagosparquimetroEdit from 'pages/tblpagosparquimetro/Edit';
import TblparquimetrosList from 'pages/tblparquimetros/List';
import TblparquimetrosView from 'pages/tblparquimetros/View';
import TblparquimetrosAdd from 'pages/tblparquimetros/Add';
import TblparquimetrosEdit from 'pages/tblparquimetros/Edit';
import TblprorrogasolicitudesList from 'pages/tblprorrogasolicitudes/List';
import TblprorrogasolicitudesView from 'pages/tblprorrogasolicitudes/View';
import TblprorrogasolicitudesAdd from 'pages/tblprorrogasolicitudes/Add';
import TblprorrogasolicitudesEdit from 'pages/tblprorrogasolicitudes/Edit';
import TblpuntosrecaudacionList from 'pages/tblpuntosrecaudacion/List';
import TblpuntosrecaudacionView from 'pages/tblpuntosrecaudacion/View';
import TblpuntosrecaudacionAdd from 'pages/tblpuntosrecaudacion/Add';
import TblpuntosrecaudacionEdit from 'pages/tblpuntosrecaudacion/Edit';
import TblserviciosList from 'pages/tblservicios/List';
import TblserviciosView from 'pages/tblservicios/View';
import TblserviciosAdd from 'pages/tblservicios/Add';
import TblserviciosEdit from 'pages/tblservicios/Edit';
import TblvehiculosList from 'pages/tblvehiculos/List';
import TblvehiculosView from 'pages/tblvehiculos/View';
import TblvehiculosAdd from 'pages/tblvehiculos/Add';
import TblvehiculosEdit from 'pages/tblvehiculos/Edit';
//--------------------
import BusquedaActa  from 'pages/serviciosprevalorados/busquedaacta';
import actaentregapopup  from 'pages/serviciosprevalorados/actaentregapopup';

//MOD2 ARQUEO
import ArqueoRecaudacionPage from 'pages/arqueo-recaudacion/index';
import ArqueoRecaudacionAddPage from 'pages/arqueo-recaudacion/Add';
import ArqueoRecaudacionViewPage from 'pages/arqueo-recaudacion/View';
import ArqueoRecaudacionEditPage from 'pages/arqueo-recaudacion/Edit';
import ArqueoRecaudacionFinalPage from 'pages/arqueo-recaudacion/ArqueoFinal';

//Registro de prevaloradas
import PrevaloradasList from 'pages/registroprevaloradas/List'

import TblActasList from 'pages/tblactas/List';
//--------------------
import UsersList from 'pages/users/List';
import UsersView from 'pages/users/View';
import UsersAdd from 'pages/users/Add';
import UsersEdit from 'pages/users/Edit';
import AccountPages from 'pages/account';
import HomePage from './pages/home/HomePage';
import IndexPages from './pages/index';
import ErrorPages from './pages/errors';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'assets/styles/layout.scss';
const App = () => {
	const auth = useAuth();
	function DefaultPage(){
		if(!auth.isLoggedIn){
			return <IndexPage />
		}
		return <Navigate to="/home" replace />;
	}
	return (
		<Routes>
			<Route exact element={<AuthRoutes />}>
			<Route element={<MainLayout />}>
				<Route path="/home" element={<HomePage />} />
				
				{/* arqueo-recaudacion routes*/}
				<Route path="/arqueo-recaudacion/add" element={<ArqueoRecaudacionAddPage />} />
				<Route path="/arqueo-recaudacion/edit/:id" element={<ArqueoRecaudacionEditPage />} />
				<Route path="/arqueo-recaudacion/arqueo-final" element={<ArqueoRecaudacionFinalPage />} />
				<Route path="/arqueo-recaudacion/:id" element={<ArqueoRecaudacionViewPage />} />
				<Route path="/arqueo-recaudacion" element={<ArqueoRecaudacionPage />} />

				{/* actaentregacab pages routes */}
				<Route path="/actaentregacab" element={<ActaentregacabList />} />
				<Route path="/actaentregacab/:fieldName/:fieldValue" element={<ActaentregacabList />} />
				<Route path="/actaentregacab/index/:fieldName/:fieldValue" element={<ActaentregacabList />} />
				<Route path="/actaentregacab/view/:pageid" element={<ActaentregacabView />} />
				<Route path="/actaentregacab/add" element={<ActaentregacabAdd />} />
				<Route path="/actaentregacab/edit/:pageid" element={<ActaentregacabEdit />} />

				{/* actaentregadet pages routes */}
				<Route path="/actaentregadet" element={<ActaentregadetList />} />
				<Route path="/actaentregadet/:fieldName/:fieldValue" element={<ActaentregadetList />} />
				<Route path="/actaentregadet/index/:fieldName/:fieldValue" element={<ActaentregadetList />} />
				<Route path="/actaentregadet/view/:pageid" element={<ActaentregadetView />} />
				<Route path="/actaentregadet/add" element={<ActaentregadetAdd />} />
				<Route path="/actaentregadet/edit/:pageid" element={<ActaentregadetEdit />} />

				{/* arqueocab pages routes */}
				<Route path="/arqueocab" element={<ArqueocabList />} />
				<Route path="/arqueocab/:fieldName/:fieldValue" element={<ArqueocabList />} />
				<Route path="/arqueocab/index/:fieldName/:fieldValue" element={<ArqueocabList />} />
				<Route path="/arqueocab/view/:pageid" element={<ArqueocabView />} />
				<Route path="/arqueocab/add" element={<ArqueocabAdd />} />
				<Route path="/arqueocab/edit/:pageid" element={<ArqueocabEdit />} />

				{/* arqueodetcortes pages routes */}
				<Route path="/arqueodetcortes" element={<ArqueodetcortesList />} />
				<Route path="/arqueodetcortes/:fieldName/:fieldValue" element={<ArqueodetcortesList />} />
				<Route path="/arqueodetcortes/index/:fieldName/:fieldValue" element={<ArqueodetcortesList />} />
				<Route path="/arqueodetcortes/view/:pageid" element={<ArqueodetcortesView />} />
				<Route path="/arqueodetcortes/add" element={<ArqueodetcortesAdd />} />
				<Route path="/arqueodetcortes/edit/:pageid" element={<ArqueodetcortesEdit />} />

				{/* arqueorecaudacioncab pages routes */}
				<Route path="/arqueorecaudacioncab" element={<ArqueorecaudacioncabList />} />
				<Route path="/arqueorecaudacioncab/:fieldName/:fieldValue" element={<ArqueorecaudacioncabList />} />
				<Route path="/arqueorecaudacioncab/index/:fieldName/:fieldValue" element={<ArqueorecaudacioncabList />} />
				<Route path="/arqueorecaudacioncab/view/:pageid" element={<ArqueorecaudacioncabView />} />
				<Route path="/arqueorecaudacioncab/add" element={<ArqueorecaudacioncabAdd />} />
				<Route path="/arqueorecaudacioncab/edit/:pageid" element={<ArqueorecaudacioncabEdit />} />

				{/* arqueorecaudaciondet pages routes */}
				<Route path="/arqueorecaudaciondet" element={<ArqueorecaudaciondetList />} />
				<Route path="/arqueorecaudaciondet/:fieldName/:fieldValue" element={<ArqueorecaudaciondetList />} />
				<Route path="/arqueorecaudaciondet/index/:fieldName/:fieldValue" element={<ArqueorecaudaciondetList />} />
				<Route path="/arqueorecaudaciondet/view/:pageid" element={<ArqueorecaudaciondetView />} />
				<Route path="/arqueorecaudaciondet/add" element={<ArqueorecaudaciondetAdd />} />
				<Route path="/arqueorecaudaciondet/edit/:pageid" element={<ArqueorecaudaciondetEdit />} />

				{/* roles pages routes */}
				<Route path="/roles" element={<RolesList />} />
				<Route path="/roles/:fieldName/:fieldValue" element={<RolesList />} />
				<Route path="/roles/index/:fieldName/:fieldValue" element={<RolesList />} />
				<Route path="/roles/view/:pageid" element={<RolesView />} />
				<Route path="/roles/add" element={<RolesAdd />} />
				<Route path="/roles/edit/:pageid" element={<RolesEdit />} />

				{/* tblarrendamientos pages routes */}
				<Route path="/tblarrendamientos" element={<TblarrendamientosList />} />
				<Route path="/tblarrendamientos/:fieldName/:fieldValue" element={<TblarrendamientosList />} />
				<Route path="/tblarrendamientos/index/:fieldName/:fieldValue" element={<TblarrendamientosList />} />
				<Route path="/tblarrendamientos/view/:pageid" element={<TblarrendamientosView />} />
				<Route path="/tblarrendamientos/add" element={<TblarrendamientosAdd />} />
				<Route path="/tblarrendamientos/edit/:pageid" element={<TblarrendamientosEdit />} />

				{/* tblarrendamientosdocumentos pages routes */}
				<Route path="/tblarrendamientosdocumentos" element={<TblarrendamientosdocumentosList />} />
				<Route path="/tblarrendamientosdocumentos/:fieldName/:fieldValue" element={<TblarrendamientosdocumentosList />} />
				<Route path="/tblarrendamientosdocumentos/index/:fieldName/:fieldValue" element={<TblarrendamientosdocumentosList />} />
				<Route path="/tblarrendamientosdocumentos/view/:pageid" element={<TblarrendamientosdocumentosView />} />
				<Route path="/tblarrendamientosdocumentos/add" element={<TblarrendamientosdocumentosAdd />} />
				<Route path="/tblarrendamientosdocumentos/edit/:pageid" element={<TblarrendamientosdocumentosEdit />} />

				{/* tbledificio pages routes */}
				<Route path="/tbledificio" element={<TbledificioList />} />
				<Route path="/tbledificio/:fieldName/:fieldValue" element={<TbledificioList />} />
				<Route path="/tbledificio/index/:fieldName/:fieldValue" element={<TbledificioList />} />
				<Route path="/tbledificio/view/:pageid" element={<TbledificioView />} />
				<Route path="/tbledificio/add" element={<TbledificioAdd />} />
				<Route path="/tbledificio/edit/:pageid" element={<TbledificioEdit />} />

				{/* tbledificioambiente pages routes */}
				<Route path="/tbledificioambiente" element={<TbledificioambienteList />} />
				<Route path="/tbledificioambiente/:fieldName/:fieldValue" element={<TbledificioambienteList />} />
				<Route path="/tbledificioambiente/index/:fieldName/:fieldValue" element={<TbledificioambienteList />} />
				<Route path="/tbledificioambiente/view/:pageid" element={<TbledificioambienteView />} />
				<Route path="/tbledificioambiente/add" element={<TbledificioambienteAdd />} />
				<Route path="/tbledificioambiente/edit/:pageid" element={<TbledificioambienteEdit />} />

				{/* tbledificionivel pages routes */}
				<Route path="/tbledificionivel" element={<TbledificionivelList />} />
				<Route path="/tbledificionivel/:fieldName/:fieldValue" element={<TbledificionivelList />} />
				<Route path="/tbledificionivel/index/:fieldName/:fieldValue" element={<TbledificionivelList />} />
				<Route path="/tbledificionivel/view/:pageid" element={<TbledificionivelView />} />
				<Route path="/tbledificionivel/add" element={<TbledificionivelAdd />} />
				<Route path="/tbledificionivel/edit/:pageid" element={<TbledificionivelEdit />} />

				{/* tbledificioseccion pages routes */}
				<Route path="/tbledificioseccion" element={<TbledificioseccionList />} />
				<Route path="/tbledificioseccion/:fieldName/:fieldValue" element={<TbledificioseccionList />} />
				<Route path="/tbledificioseccion/index/:fieldName/:fieldValue" element={<TbledificioseccionList />} />
				<Route path="/tbledificioseccion/view/:pageid" element={<TbledificioseccionView />} />
				<Route path="/tbledificioseccion/add" element={<TbledificioseccionAdd />} />
				<Route path="/tbledificioseccion/edit/:pageid" element={<TbledificioseccionEdit />} />

				{/* tblfacturadetalle pages routes */}
				<Route path="/tblfacturadetalle" element={<TblfacturadetalleList />} />
				<Route path="/tblfacturadetalle/:fieldName/:fieldValue" element={<TblfacturadetalleList />} />
				<Route path="/tblfacturadetalle/index/:fieldName/:fieldValue" element={<TblfacturadetalleList />} />
				<Route path="/tblfacturadetalle/view/:pageid" element={<TblfacturadetalleView />} />
				<Route path="/tblfacturadetalle/add" element={<TblfacturadetalleAdd />} />
				<Route path="/tblfacturadetalle/edit/:pageid" element={<TblfacturadetalleEdit />} />

				{/* tblfacturas pages routes */}
				<Route path="/tblfacturas" element={<TblfacturasList />} />
				<Route path="/tblfacturas/:fieldName/:fieldValue" element={<TblfacturasList />} />
				<Route path="/tblfacturas/index/:fieldName/:fieldValue" element={<TblfacturasList />} />
				<Route path="/tblfacturas/view/:pageid" element={<TblfacturasView />} />
				<Route path="/tblfacturas/add" element={<TblfacturasAdd />} />
				<Route path="/tblfacturas/edit/:pageid" element={<TblfacturasEdit />} />

				{/* tbloperadores pages routes */}
				<Route path="/tbloperadores" element={<TbloperadoresList />} />
				<Route path="/tbloperadores/:fieldName/:fieldValue" element={<TbloperadoresList />} />
				<Route path="/tbloperadores/index/:fieldName/:fieldValue" element={<TbloperadoresList />} />
				<Route path="/tbloperadores/view/:pageid" element={<TbloperadoresView />} />
				<Route path="/tbloperadores/add" element={<TbloperadoresAdd />} />
				<Route path="/tbloperadores/edit/:pageid" element={<TbloperadoresEdit />} />

				{/* tblpagosarrendamientos pages routes */}
				<Route path="/tblpagosarrendamientos" element={<TblpagosarrendamientosList />} />
				<Route path="/tblpagosarrendamientos/:fieldName/:fieldValue" element={<TblpagosarrendamientosList />} />
				<Route path="/tblpagosarrendamientos/index/:fieldName/:fieldValue" element={<TblpagosarrendamientosList />} />
				<Route path="/tblpagosarrendamientos/view/:pageid" element={<TblpagosarrendamientosView />} />
				<Route path="/tblpagosarrendamientos/add" element={<TblpagosarrendamientosAdd />} />
				<Route path="/tblpagosarrendamientos/edit/:pageid" element={<TblpagosarrendamientosEdit />} />

				{/* tblpagosparquimetro pages routes */}
				<Route path="/tblpagosparquimetro" element={<TblpagosparquimetroList />} />
				<Route path="/tblpagosparquimetro/:fieldName/:fieldValue" element={<TblpagosparquimetroList />} />
				<Route path="/tblpagosparquimetro/index/:fieldName/:fieldValue" element={<TblpagosparquimetroList />} />
				<Route path="/tblpagosparquimetro/view/:pageid" element={<TblpagosparquimetroView />} />
				<Route path="/tblpagosparquimetro/add" element={<TblpagosparquimetroAdd />} />
				<Route path="/tblpagosparquimetro/edit/:pageid" element={<TblpagosparquimetroEdit />} />

				{/* tblparquimetros pages routes */}
				<Route path="/tblparquimetros" element={<TblparquimetrosList />} />
				<Route path="/tblparquimetros/:fieldName/:fieldValue" element={<TblparquimetrosList />} />
				<Route path="/tblparquimetros/index/:fieldName/:fieldValue" element={<TblparquimetrosList />} />
				<Route path="/tblparquimetros/view/:pageid" element={<TblparquimetrosView />} />
				<Route path="/tblparquimetros/add" element={<TblparquimetrosAdd />} />
				<Route path="/tblparquimetros/edit/:pageid" element={<TblparquimetrosEdit />} />

				{/* tblprorrogasolicitudes pages routes */}
				<Route path="/tblprorrogasolicitudes" element={<TblprorrogasolicitudesList />} />
				<Route path="/tblprorrogasolicitudes/:fieldName/:fieldValue" element={<TblprorrogasolicitudesList />} />
				<Route path="/tblprorrogasolicitudes/index/:fieldName/:fieldValue" element={<TblprorrogasolicitudesList />} />
				<Route path="/tblprorrogasolicitudes/view/:pageid" element={<TblprorrogasolicitudesView />} />
				<Route path="/tblprorrogasolicitudes/add" element={<TblprorrogasolicitudesAdd />} />
				<Route path="/tblprorrogasolicitudes/edit/:pageid" element={<TblprorrogasolicitudesEdit />} />

				{/* tblpuntosrecaudacion pages routes */}
				<Route path="/tblpuntosrecaudacion" element={<TblpuntosrecaudacionList />} />
				<Route path="/tblpuntosrecaudacion/:fieldName/:fieldValue" element={<TblpuntosrecaudacionList />} />
				<Route path="/tblpuntosrecaudacion/index/:fieldName/:fieldValue" element={<TblpuntosrecaudacionList />} />
				<Route path="/tblpuntosrecaudacion/view/:pageid" element={<TblpuntosrecaudacionView />} />
				<Route path="/tblpuntosrecaudacion/add" element={<TblpuntosrecaudacionAdd />} />
				<Route path="/tblpuntosrecaudacion/edit/:pageid" element={<TblpuntosrecaudacionEdit />} />

				{/* tblservicios pages routes */}
				<Route path="/tblservicios" element={<TblserviciosList />} />
				<Route path="/tblservicios/:fieldName/:fieldValue" element={<TblserviciosList />} />
				<Route path="/tblservicios/index/:fieldName/:fieldValue" element={<TblserviciosList />} />
				<Route path="/tblservicios/view/:pageid" element={<TblserviciosView />} />
				<Route path="/tblservicios/add" element={<TblserviciosAdd />} />
				<Route path="/tblservicios/edit/:pageid" element={<TblserviciosEdit />} />

				{/* tblvehiculos pages routes */}
				<Route path="/tblvehiculos" element={<TblvehiculosList />} />
				<Route path="/tblvehiculos/:fieldName/:fieldValue" element={<TblvehiculosList />} />
				<Route path="/tblvehiculos/index/:fieldName/:fieldValue" element={<TblvehiculosList />} />
				<Route path="/tblvehiculos/view/:pageid" element={<TblvehiculosView />} />
				<Route path="/tblvehiculos/add" element={<TblvehiculosAdd />} />
				<Route path="/tblvehiculos/edit/:pageid" element={<TblvehiculosEdit />} />

				{/* users pages routes */}
				<Route path="/users" element={<UsersList />} />
				<Route path="/users/:fieldName/:fieldValue" element={<UsersList />} />
				<Route path="/users/index/:fieldName/:fieldValue" element={<UsersList />} />
				<Route path="/users/view/:pageid" element={<UsersView />} />
				<Route path="/users/add" element={<UsersAdd />} />
				<Route path="/users/edit/:pageid" element={<UsersEdit />} />
				<Route path="/account/*" element={<AccountPages />} />

				{/* Registro de prevaloradas */}
				<Route path='/cajas/registro/prevaloradas' element={<PrevaloradasList/>}/>

				{/* Servicios Prevalorados */}
				<Route path="/serviciosprevalorados/busquedaacta/" element={<BusquedaActa />} /> 

				{/* <Route path="/serviciosprevalorados/busquedaacta1/" element={<BusquedaActa2 />} />  */}
				<Route path="/serviciosprevalorados/actaentregapopup/" element={<actaentregapopup />} /> 

				
				
				<Route path="/tblactas/view" element={<TblActasList />} /> 
			</Route>
			</Route>
			<Route exact element={<IndexLayout />}>
				<Route path="/" element={<DefaultPage />} />
				<Route path="/*" element={<IndexPages />} />
				<Route path="/error/*" element={<ErrorPages />} />
			</Route>
		</Routes>
	);
}
export default App;
