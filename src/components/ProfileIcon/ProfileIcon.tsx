import classes from './ProfileIcon.module.css';

export function ProfileIcon({name}: {name: string}) {
    const firstLetterOfName = name.charAt(0)
    return (
        <div className={classes.container}>
            <div className={classes.name}>
                {firstLetterOfName}
            </div>
        </div>
    )
}