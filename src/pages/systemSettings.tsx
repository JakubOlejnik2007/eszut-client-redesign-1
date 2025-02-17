import ManageCategories from "../components/settings/ManageCategories";
import ManagePlaces from "../components/settings/ManagePlaces";

const SystemSettings = () => {
    return (
        <>
            <div style={{ backgroundColor: '', width: '100%', margin: '-15px', marginBottom: '0px' }} className="content-padding text-justify">

                <ManageCategories />
                <ManagePlaces />

            </div>
        </>
    )
}

export default SystemSettings;





