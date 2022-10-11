import axios from 'axios';
const apiUrl = 'http://localhost:4000/graphql';
const headers = { 'Content-Type': 'application/json' };
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
                }`;
    return sendApiRequest(query);
};
export const NactiUkol = (id) => {
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
    console.log('NactiUkol query: ' + query);
    return sendApiRequest(query);
};
/** PridejUkol - přidá nový úkol
 *
 * @returns axios promise with data or error
 */
export const PridejUkol = (ukol) => {
    /*const query = `mutation {
                    pridejUkol( popis: "${ukol.popis}",
                                splneny: ${ukol.splneny},
                                dulezity: ${ukol.dulezity},
                                ${ukol.datum != null ? 'datum: ",' + ukol.datum + '",':''}
                                ${ukol.poznamka !== null ? 'poznamka:"' +  ukol.poznamka + '"' : ''}
                                )
                    {id, popis, splneny, dulezity, datum, poznamka }
                }`*/
    const query = `mutation {
                    pridejUkol(${queryfy(ukol)}) 
                    {id, popis, splneny, dulezity, datum, poznamka }
                }`;
    //console.log(query);
    return sendApiRequest(query);
};
/** UpravUkol - změní daný úkol
 *
 * @params User - změněný záznam včetně id měněného úkolu
 * @returns axios promise with data or error
 */
export const UpravUkol = (ukol) => {
    /*const query = `mutation {
                    upravUkol( id: ${ukol.id}
                               popis: "${ukol.popis}",
                               splneny: ${ukol.splneny},
                               dulezity: ${ukol.dulezity},
                               datum: "${ukol.datum}",
                               poznamka: "${ukol.poznamka}")
                    {id, popis, splneny, dulezity, datum, poznamka }
                }`*/
    const query = `mutation {
                upravUkol(${queryfy(ukol)}) 
                {id, popis, splneny, dulezity, datum, poznamka }
            }`;
    return sendApiRequest(query);
};
/** SmazUkol - vymaže daný úkol
 *
 * @params id: number id mazaného úkolu
 * @returns axios promise with data or error
 */
export const SmazUkol = (id) => {
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
function sendApiRequest(query) {
    return (axios({
        url: apiUrl,
        method: 'post',
        headers: headers,
        data: {
            query: query,
        }
    })
        .then(response => {
        return response.data;
    })
        .catch(function (error) {
        return error;
    }));
}
function queryfy(obj) {
    return JSON.stringify(obj).replace(/"([^"]+)":/g, '$1:').slice(1, -1);
}
//# sourceMappingURL=ApiModel.js.map