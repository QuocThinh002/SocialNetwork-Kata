import './personal.scss'
import {useSelector} from 'react-redux'

function Personal() {
    const { userInfo } = useSelector(state => state.authReducer);
    console.log(userInfo)

    return (<>
        <div className='container'>
            <div className="personal">
                <div className='personal__head'>
                    <div className='personal__cover-photo'>
                        <img src='https://scontent.fvca1-3.fna.fbcdn.net/v/t39.30808-6/307912404_183384834217593_8812195568949806864_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=FyhL2CzGiZUQ7kNvgEB3NRj&_nc_ht=scontent.fvca1-3.fna&oh=00_AYB3giFXRYnuHEC5aOEJ5Ay58i1vloW32Y1hYw9JldsR2g&oe=66C87265' alt='cover photo' />
                    </div>
                    <div className='personal__box'>
                        <div className="personal__avatar">
                            <img src='https://scontent.fvca1-1.fna.fbcdn.net/v/t39.30808-6/431769001_439182608637813_7004122701510622393_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=IXELCNP4RCEQ7kNvgHfWTKK&_nc_ht=scontent.fvca1-1.fna&oh=00_AYAHIvzoVySaj00SUlKwpFOj9UV2ELWeKzUUxBHUxef-KQ&oe=66C877EC' alt='profile picture' />
                        </div>
                        <div className='personal__box-right'>
                            <h2 className='personal__box-right__name'>{userInfo.name}</h2>
                            <span className='personal__box-right__friends'>{userInfo.friends.length} friends</span>
                            <div className='personal__box-right__friends-img'>
                                <img src='https://scontent.fvca1-4.fna.fbcdn.net/v/t39.30808-6/375678441_324992426723499_4564241413214117071_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=86c6b0&_nc_ohc=4wdQNhJwwTwQ7kNvgHGt06V&_nc_ht=scontent.fvca1-4.fna&oh=00_AYBfg4-WDUl0IdKWwX-YnO2NcvCnyzgsvL46zdpExTB0KA&oe=66C89838' alt='img-friend' />
                                <img src='https://scontent.fvca1-1.fna.fbcdn.net/v/t39.30808-6/431769001_439182608637813_7004122701510622393_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=IXELCNP4RCEQ7kNvgHfWTKK&_nc_ht=scontent.fvca1-1.fna&oh=00_AYAHIvzoVySaj00SUlKwpFOj9UV2ELWeKzUUxBHUxef-KQ&oe=66C877EC' alt='img-friend' />
                                <img src='https://scontent.fvca1-1.fna.fbcdn.net/v/t39.30808-6/431769001_439182608637813_7004122701510622393_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=IXELCNP4RCEQ7kNvgHfWTKK&_nc_ht=scontent.fvca1-1.fna&oh=00_AYAHIvzoVySaj00SUlKwpFOj9UV2ELWeKzUUxBHUxef-KQ&oe=66C877EC' alt='img-friend' />
                                <img src='https://scontent.fvca1-1.fna.fbcdn.net/v/t39.30808-6/431769001_439182608637813_7004122701510622393_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=IXELCNP4RCEQ7kNvgHfWTKK&_nc_ht=scontent.fvca1-1.fna&oh=00_AYAHIvzoVySaj00SUlKwpFOj9UV2ELWeKzUUxBHUxef-KQ&oe=66C877EC' alt='img-friend' />
                                <img src='https://scontent.fvca1-1.fna.fbcdn.net/v/t39.30808-6/431769001_439182608637813_7004122701510622393_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=IXELCNP4RCEQ7kNvgHfWTKK&_nc_ht=scontent.fvca1-1.fna&oh=00_AYAHIvzoVySaj00SUlKwpFOj9UV2ELWeKzUUxBHUxef-KQ&oe=66C877EC' alt='img-friend' />
                                <img src='https://scontent.fvca1-1.fna.fbcdn.net/v/t39.30808-6/431769001_439182608637813_7004122701510622393_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=IXELCNP4RCEQ7kNvgHfWTKK&_nc_ht=scontent.fvca1-1.fna&oh=00_AYAHIvzoVySaj00SUlKwpFOj9UV2ELWeKzUUxBHUxef-KQ&oe=66C877EC' alt='img-friend' />
                                <img src='https://scontent.fvca1-1.fna.fbcdn.net/v/t39.30808-6/431769001_439182608637813_7004122701510622393_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=IXELCNP4RCEQ7kNvgHfWTKK&_nc_ht=scontent.fvca1-1.fna&oh=00_AYAHIvzoVySaj00SUlKwpFOj9UV2ELWeKzUUxBHUxef-KQ&oe=66C877EC' alt='img-friend' />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </>)
}

export default Personal;