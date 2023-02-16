import { useQuery, gql, useMutation } from '@apollo/client';
import React from 'react';

export const GENERATE_MAIL = gql`
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
export const useApolloQuery = () =>{
    
    const CHECK_MAIL = gql`
    query {
        session(id: "${sessionStorage.getItem('@SESSION_ID')}") {
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
    
    const { data, errors, loading } = useQuery(CHECK_MAIL)
 
    return {data, errors, loading}
}