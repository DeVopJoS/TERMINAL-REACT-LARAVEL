import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

export default function AccountBlocked() {
    
    return (<div className="container">
        <div className="grid justify-content-center">
            <div className="col md:col-5">
                <div className="text-center card">
                    <Avatar className="bg-pink-500 text-white" size="large" icon="pi pi-ban" />
                    <div className="text-3xl my-3  font-bold text-pink-500 my-3">
                        Tu cuenta ha sido bloqueada
                    </div>
                    <div className="text-500">
                        Póngase en contacto con el administrador del sistema para obtener más información
                    </div>
                    <hr />
                    <Link to="/">
                        <Button label="Continuar" icon="pi pi-home" />
                    </Link>
                </div>
            </div>
        </div>
    </div>);
}
