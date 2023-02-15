import { useQuery, gql, useMutation } from '@apollo/client';


const GENERATE_MAIL = gql`
mutation {
    introduceSession {
        id,
        expiresAt,
        addresses {
          address
        }
    }
}
`


export const ApolloMutation = () =>{

    const {data, loading, error} = useMutation(GENERATE_MAIL)
    
    return (
     <>
        {data}
        {error}
    </>)


}

export const ApolloQuery = (MAIL_ID) =>{

    const CHECK_MAIL = gql`
    query {
        session(id: "${MAIL_ID}") {
            mails{
                rawSize,
                fromAddr,
                toAddr,
                downloadUrl,
                text,
                headerSubject
            }
        }
    }
    `
    const {data, loading, error, reset} = useQuery(CHECK_MAIL)
    if(data){
        console.log(data)
    }

    return data
}