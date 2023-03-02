import { FaTrash } from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { DELETE_CLIENT } from '../mutations/clientMutations'
import { GET_PROJECTS } from '../queries/clientQueries'

function ProjectCard({ project }) {

    // const [deleteClient] = useMutation(DELETE_CLIENT, {
    //     variables: { id : project.id },
    //     // refetchQueries: [{ query: GET_CLIENTS }]
    //     update(cache, { data: { deleteClient }}) {
    //         const { clients } = cache.readQuery({ query: GET_CLIENTS });
    //         cache.writeQuery({
    //             query: GET_CLIENTS,
    //             data: { clients: clients.filter(client => client.id !== deleteClient.id )}
    //         })
    //     }
    // })

    return (
        <div className="col-md-6">
            <div className="card mb-3">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title">
                            {project.name}
                        </h5>
                        <a className="btn btn-light" href={`/projects/${project.id}`}>
                            View
                        </a>
                    </div>
                    <p className="small">
                        Status: <strong>{project.status}</strong>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard
