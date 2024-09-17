import { LogInScreen } from "../pages/logIn"
import { ReportIssueScreen } from "../pages/reportIssue"

const WindowWrapper = ({title, element}: any) => {
    return(
<div className='window'>
          <div className='titleBar'>{title}</div>
          <div className='windowContent'>
            {element}
    </div>
</div>
)}