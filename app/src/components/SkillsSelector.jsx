export default function SkillsSelector({ selectedSkills, onSelectSkill }) {
    const skills = [
        'HTML5', 'CSS3', 'CSSGrid', 'Flexbox', 'JavaScript', 'jQuery',
        'Node', 'Angular', 'VueJS', 'ReactJS', 'React Hooks', 'Java', 'Redux', 'Apollo', 'GraphQL', 
        'TypeScript', 'PHP', 'Laravel', 'Express', 'Symfony', 'Python', 'Django', 'ORM', 'MySQL', 
        'MongoDB', 'MVC', 'SASS', 'WordPress', '.Net', 'SpringBoot'
    ]

    return (
        <ul className="lista-conocimientos">
            {skills.map((skill, index) => {
                const normalizedSkill = skill.trim()
                const isSelected = selectedSkills.includes(normalizedSkill)
                
                return (
                    <li
                        key={index}
                        className={isSelected ? 'activo' : ''}
                        onClick={() => onSelectSkill(normalizedSkill)}
                    >
                        {skill}
                    </li>
                )
            })}
        </ul>
    )
}
