import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './components/styles/index.css';
import reportWebVitals from './reportWebVitals';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const LargeComponent = React.lazy(() => import('./components/App'));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    {/* <ErrorBoundary fallback={<p>Something went wrong</p>}> */}
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Suspense fallback={<div>Loading...</div>}>
        <LargeComponent />
      </Suspense>
    </MuiPickersUtilsProvider>
    {/* </ErrorBoundary> */}
  </React.StrictMode>
);

reportWebVitals();
