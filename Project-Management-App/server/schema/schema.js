const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType } = require('graphql')

const Project = require('../models/Project')
const Client = require('../models/Client')

const clientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID},
        name: { type: GraphQLString},
        email: { type: GraphQLString},
        phone: { type: GraphQLString}
    })
});

const projectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID},
        name: { type: GraphQLString},
        description: { type: GraphQLString},
        status: { type: GraphQLString},
        client: {
            type: clientType,
            resolve(parent, args){
                return Client.findById(parent.clientId)
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // what we can query, has to be mentioned here
        clients: {
            type: new GraphQLList(clientType),
            resolve(parent, args){
                return Client.find();
            }
        },
        client: {
            type: clientType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args) {
                return Client.findById(args.id)
            }
        },
        projects: {
            type: new GraphQLList(projectType),
            resolve(parent, args){
                return Project.find();
            }
        },
        project: {
            type: projectType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args) {
                return Project.findById(args.id)
            }
        }
    }
});

// Mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addClient: {
            type: clientType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve(parents, args){
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone
                })

                return client.save();
            }
        },
        deleteClient: {
            type: clientType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve(parents, args){
                Project.find({ clientId: args.id }).then((projects) => {
                    projects.forEach((project) => project.remove())
                })
                return Client.findByIdAndRemove(args.id);
            }
        },
        addProject: {
            type: projectType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                status: { 
                    type: new GraphQLEnumType({
                        name: 'ProjectStatus',
                        values: {
                            'new': { value: 'Not Started' },
                            'progress': { value: 'In Progress' },
                            'completed': { value: 'Completed' }
                        }
                    }),
                    defaultValue: 'Not Started'
                },
                clientId: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parents, args){
                const project = new Project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId
                })

                return project.save();
            }
        },
        deleteProject: {
            type: projectType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve(parents, args){
                return Project.findByIdAndRemove(args.id);
            }
        },
        updateProject: {
            type: projectType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                status: { 
                    type: new GraphQLEnumType({
                        name: 'ProjectStatusUpdate',
                        values: {
                            'new': { value: 'Not Started' },
                            'progress': { value: 'In Progress' },
                            'completed': { value: 'Completed' }
                        }
                    })
                },
            },
            resolve(parents, args){
                return Project.findByIdAndUpdate(
                    args.id, 
                    {
                        $set: {
                            name: args.name,
                            description: args.description,
                            status: args.status,
                        }
                    },
                    { 
                        new: true
                    }
                );
            }
        },
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})

// mutation{
//     addClient(name: "Parakh", email: "abc@abc.com", phone: "2124341134"){
//       name, 
//       id,
//       email
//     }
//   }