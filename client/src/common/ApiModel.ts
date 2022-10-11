import axios from 'axios';

const apiUrl = 'http://localhost:4000/graphql';
const headers = { 'Content-Type': 'application/json' };

export type Ukol = {
    id: number;
    popis: string;
    splneny: boolean;
    dulezity: boolean;
    datum?: string;
    poznamka?: string;
};


/** VsechnyUkoly - vráti seznam všech úkolů
 * 
 * @returns axios promise with data or error
 */
export const VsechnyUkoly = () => {
    const query = `{
                    ukoly {
                        id
                        popis
                        splneny
                        dulezity
                        datum
                        poznamka
                    }   
                }`
    return sendApiRequest(query);
};

export const NactiUkol = (id: number) => {
    const query = `{
                    ukol(id: ${id}) {
                        id
                        popis
                        splneny
                        dulezity
                        datum
                        poznamka
                    }   
                }`;
    //console.log('NactiUkol query: ' + query);
    return sendApiRequest(query);
}

/** PridejUkol - přidá nový úkol
 * 
 * @returns axios promise with data or error
 */
export const PridejUkol = (ukol: Ukol) => {
    const query = `mutation {
                    pridejUkol( id: 0,
                                popis: "${ukol.popis}", 
                                splneny: ${ukol.splneny}, 
                                dulezity: ${ukol.dulezity}, 
                                ${ukol.datum ? 'datum: "' + ukol.datum + '",':''}
                                ${ukol.poznamka ? 'poznamka: "' +  ukol.poznamka + '"' : ''}
                                ) 
                    {id, popis, splneny, dulezity, datum, poznamka }
                }`
    /*const query = `mutation {
                    pridejUkol(${queryfy(ukol)}) 
                    {id, popis, splneny, dulezity, datum, poznamka }
                }`*/

    //console.log(query);
    return sendApiRequest(query);
};

/** UpravUkol - změní daný úkol 
 * 
 * @params User - změněný záznam včetně id měněného úkolu
 * @returns axios promise with data or error
 */
export const UpravUkol = (ukol: Ukol) => {
    // v poznámce je nutné nahradit odřádkování znakem \\r\\n
    const query = `mutation {
                    upravUkol( id: ${ukol.id}
                               popis: "${ukol.popis}", 
                               splneny: ${ukol.splneny}, 
                               dulezity: ${ukol.dulezity}, 
                                ${ukol.datum ? 'datum: "' + ukol.datum + '",':''}
                                ${ukol.poznamka ? 'poznamka:"' + ukol.poznamka.replace(/\n/g, '\\n') + '"' : ''}
                                )
                    {id, popis, splneny, dulezity, datum, poznamka }
                }`
    /*const query = `mutation {
                upravUkol(${queryfy(ukol)}) 
                {id, popis, splneny, dulezity, datum, poznamka }
            }`*/
    //console.log(query);
    return sendApiRequest(query);
};

/** SmazUkol - vymaže daný úkol 
 * 
 * @params id: number id mazaného úkolu
 * @returns axios promise with data or error
 */
export const SmazUkol = (id: number) => {
    const query = `mutation {
                    odeberUkol(id: ${id}) { id }
                }`;
    //console.log(query);
    return sendApiRequest(query);
};


/** Zavolá API pro předané query
 * 
 * @param query: string - graphql dotaz
 * @returns promise s vrácenými daty nebo error
 */
function sendApiRequest(query: string) {
    return (axios({
        url: apiUrl,
        method: 'post',
        headers: headers,
        data: {
            query: query,
            }
        })
        .then(response => {
            //console.log(response.data);
            return response.data;
        })
        .catch(function (error) {
            return error;
        })
    );
}
/** queryfy
 * 
 * @param obj: Úkol
 * @returns String ve formátu vlastnost: "hodnota" pro použítí v query dotazu na graphql server
 * 
 * Nakonec jsem ji nepoužil, protože je nutné testovat zda jsou zadány nepovinné hodnoty
 *
function queryfy(obj: object) { 
    return JSON.stringify(obj).replace(/"([^"]+)":/g, '$1:').slice(1, -1)

}*/

