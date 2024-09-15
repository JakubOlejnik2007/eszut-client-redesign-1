import TNavigationItem from "../types/navigationItem.type";
import TUserRole from "../types/userroles.enum";
import urls from "./urls";

const Placeholder = () => <div>Placeholder</div>;

const NAVIGATION_ITEMS: TNavigationItem[] = [
  {
    id: "1",
    path: urls.client.reportProblem,
    name: "Zgłoś usterkę",
    element: <Placeholder />,
    isMenu: true,
    minUserRole: TUserRole.USER,
  },
  {
    id: "2",
    path: urls.client.about,
    name: "O aplikacji",
    element: <Placeholder />,
    isMenu: true,
    minUserRole: TUserRole.GUEST,
  },
  { id: "3", path: urls.client.mainpage, name: "Zaloguj się", element: <Placeholder />, isMenu: false, minUserRole: TUserRole.GUEST },
  { id: "4.1", path: urls.client.problems, name: "Zgłoszenia", element: <Placeholder />, isMenu: true, minUserRole: TUserRole.ADMIN },
  { id: "4.2", path: urls.client.archive, name: "Archiwum", element: <Placeholder />, isMenu: true, minUserRole: TUserRole.ADMIN },
  { id: "4.5", path: urls.client.displaylog, name: "Dziennik LOG", element: <Placeholder />, isMenu: true, minUserRole: TUserRole.ADMIN }
];

export default NAVIGATION_ITEMS;