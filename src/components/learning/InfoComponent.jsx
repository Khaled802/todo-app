const info = {
    name: "Ahmed",
    country: "Egypt",
    contacts:  {
        linkedin: "linkedin.com/in/khaled802",
        twitter: "twitter.com/in/khaled802",
    },
    skill: ["Java", "Js"]
}

export default function InfoComponent() {
    return (
        <div className="InfoComponent"> 
            <h1> Name: {info.name} </h1>
            <h2> Country: {info.country}</h2>
            <p> Linkedin: {info.contacts.linkedin}</p>
            <p> skill: {info.skill[0]}</p>
        </div>
    )
}