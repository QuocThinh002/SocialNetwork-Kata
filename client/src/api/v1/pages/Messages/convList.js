import './convList.scss'
import { useTranslation } from 'react-i18next';
import ContactSearch from '../../components/ContactSearch';


function ConvList() {
    const { t } = useTranslation();

    const handleChangeSearch = () => {

    }

    return (<>
        <div className="conv-list">
            <ContactSearch />
        </div>
    </>)
}

export default ConvList;