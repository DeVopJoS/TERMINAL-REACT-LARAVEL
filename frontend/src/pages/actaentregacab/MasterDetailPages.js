import { useEffect } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Title } from 'components/Title';
import ActaentregadetListPage from 'pages/actaentregadet/List';
import useApp from 'hooks/useApp';

const MasterDetailPages = (props) => {
		const app = useApp();
	const { masterRecord, scrollIntoView = true } = props;
	const activeTab = 0;
	function scrollToDetailPage() {
		if (scrollIntoView) {
			const pageElement = document.getElementById('master-detailpage');
			if(pageElement){
				pageElement.scrollIntoView({behavior:'smooth', block:'start'});
			}
		}
	}
	// pass form data from master to detail
	function setDetailPageFormData(){
		const record = masterRecord;
		// set  form data
		const actaentregadetFormData = {  }
		app.setPageFormData('actaentregadet', actaentregadetFormData);
	}
	// pass form data from master to detail
	useEffect(() => {
		scrollToDetailPage();
		setDetailPageFormData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [masterRecord]);
	if(masterRecord){
		return (
<div id="master-detailpage">
    <TabView value={activeTab}>
        <TabPanel header={<Title title="Actaentregacab Actaentregadet"  headerClass="p-0" titleClass="text-lg font-bold"  iconClass="pi pi-th-large" avatarSize="small"    separator={false} />}>
            <div className="reset-grid">
                <ActaentregadetListPage isSubPage  fieldName="actaentregadet.ae_actaid" fieldValue={masterRecord.ae_actaid} showBreadcrumbs={false} showHeader={true} showFooter={true}>
                    </ActaentregadetListPage>
                </div>
            </TabPanel>
        </TabView>
    </div>
		);
	}
}
export default MasterDetailPages;
