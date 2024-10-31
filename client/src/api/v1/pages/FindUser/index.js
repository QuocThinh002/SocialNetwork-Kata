import ContactSearch from '../../components/ContactSearch';
import './findUser.scss';

function FindUser() {

    return (<>
        <div className="find-user">
            <div className='find-user__box'>
                <ContactSearch />
            </div>
        </div>
    </>)
}

export default FindUser;