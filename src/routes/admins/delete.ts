import { deleteProject } from "../../business-logic";
import { RouteMethod, makeFastifyRoute } from "../../constant-definitions";


const verify = async() => {

}
export const deleteProjectRoute: any = makeFastifyRoute(
    RouteMethod.GET,
    '/projects/:uuid/delete',
    verify,
    async (request, reply) => {
        const { params } = request;
        const { uuid } = params as {uuid: string};

        const project = await deleteProject(uuid);
        return reply.status(201).send(project)
    }
)