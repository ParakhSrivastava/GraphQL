import { useQuery } from '@apollo/client'
import { GET_PROJECTS } from '../queries/projectQueries';
import ProjectCard from './ProjectCard';

function Projects() {
    const { loading, error, data } = useQuery(GET_PROJECTS);

    if(loading) return <p>Loading...</p>
    if(error) return <p>ERROR!!!</p>

    return (
        <>
            {!loading && !error && data && (
                <div className="row mt-4">
                    {data.projects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            )}
        </>
    )
}

export default Projects
