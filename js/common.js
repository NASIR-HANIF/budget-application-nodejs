//  ajex request coding

export const ajax = (request) => {
    return new Promise((resolve, reject) => {
        const options = {
            type: request.type,
            url: request.url,
            success: (response) => {
                resolve(response)
            },
            error: (error) => {
                reject(error)

            }

        }

        // check request
        if (request.type == "POST" || request.type == "PUT") {
            options['data'] = request.data;
            options["processData"] = false;
            options["contentType"] = false;
        }

        if (request.type == "DELETE") {
            options['data'] = request.data;

        }
        // ajex request
        $.ajax(options)
    })
}


export default {
    ajax: ajax,

}




