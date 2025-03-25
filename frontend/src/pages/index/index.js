import { lazy, Suspense } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import PageLoading from 'components/PageLoading';
import PageNotFound from 'pages/errors/PageNotFound';
const ForgotPasswordPage = lazy(()=>import('./ForgotPassword'));
const ResetPasswordPage = lazy(()=>import('./ResetPassword'));
const ResetPasswordCompletedPage = lazy(()=>import('./ResetPasswordCompleted'));
const RegisterPage = lazy(() => import('pages/index/RegisterPage'));
export default function IndexPages(props) {
    return (
        <Suspense fallback={<PageLoading />}>
            <Outlet />
            <Routes>
			<Route path="/register" element={<RegisterPage />} />
			<Route path="/forgotpassword" element={<ForgotPasswordPage />} />
			<Route path="/resetpassword" element={<ResetPasswordPage />} />
			<Route path="/resetpassword_completed" element={<ResetPasswordCompletedPage />} />
				<Route path="*" element={<PageNotFound />} />
            </Routes>
        </Suspense>
    );
}
