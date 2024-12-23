import AboutScreen from "../../pages/about";
import Archive from "../../pages/archive";
import DziennikLog from "../../pages/dziennikLog";
import LogInScreen from "../../pages/logIn";
import ReportIssueScreen from "../../pages/reportIssue";
import ReportsScreen from "../../pages/reports";
import SettingsScreen from "../../pages/settings";
import TNavigationItem from "../../types/navigationItem.type";
import EUserRole from "../../types/userroles.enum";
import urls from "../../utils/urls";


const Placeholder = () => <div style={{padding: "var(--defaultPadding)"}}>Placeholder</div>;

const NAVIGATION_ITEMS: TNavigationItem[] = [
  {
    id: "1",
    path: urls.client.reportProblem,
    name: "Zgłoś usterkę",
    element: <ReportIssueScreen />,
    isMenu: true,
    minUserRole: EUserRole.USER,
  },
  {
    id: "2",
    path: urls.client.about,
    name: "O aplikacji",
    element: <AboutScreen />,
    isMenu: true,
    minUserRole: EUserRole.GUEST,
  },
  { id: "3", path: urls.client.mainpage, name: "Zaloguj się", element: <LogInScreen />, isMenu: false, minUserRole: EUserRole.GUEST },
  { id: "4.1", path: urls.client.problems, name: "Zgłoszenia", element: <ReportsScreen />, isMenu: true, minUserRole: EUserRole.ADMIN },
  { id: "4.2", path: urls.client.archive, name: "Archiwum", element: <Archive />, isMenu: true, minUserRole: EUserRole.ADMIN },
  { id: "4.5", path: urls.client.displaylog, name: "Dziennik LOG", element: <DziennikLog />, isMenu: true, minUserRole: EUserRole.ADMIN },

  { id: "5", path: urls.client.settings, name: "Ustawienia", element: <SettingsScreen />, isMenu: true, minUserRole: EUserRole.GUEST }

];

export default NAVIGATION_ITEMS;