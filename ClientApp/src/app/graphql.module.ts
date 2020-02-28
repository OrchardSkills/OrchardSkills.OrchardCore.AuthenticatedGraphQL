import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import {setContext} from 'apollo-link-context';
const uri = 'https://OrchardCMS.net/api/graphql';

// export function createApollo(httpLink: HttpLink) {
//   return {
//     link: httpLink.create(
//       {uri}
//     ),
//     cache: new InMemoryCache(),
//   };
// }

export function provideApollo(httpLink: HttpLink) {
  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8'
    }
  }));

  // Get the authentication token from local storage if it exists
  // const token = localStorage.getItem('token');
  const token = 'CfDJ8D6KXh18uYFMjSck8fI79xYz6tSdHH-VzUbeyGUkkc18xlXFYkOh9ZlolKMrx1Y22_IXaHOQRrW9PZgb5cejc65_8us_JMFHqJRaCFwwPdRFV-YznHT0jmPJWz8ZgNk2j25dnfeA9w3F0aNjfqwfOZpfwc6baRLZBmRFmycWdMzCL7Fu6LERq-sLRomlacGZc_7-vwKyB5cqSt73XT7FPvC_TK7qr7iEINhzDXbsz_2ukJPlHlJq3abkR07CBEHuiZbqTZNOKQc4_nWZTwhPD9ro2eTgOjEKHF8LaPaFYdKJLJct0b8RBL9LUQ3sWqW_q_aCV6en_3eeOkEcJzoqGNfITN--iFwk8mYIMOw9i-BqW6ih_A8oG_jjo1CL41FZJh1V4RhEmCcHxVgb9dyQ26vgVI6L0GrzimGxkooN0P8BHRn3Nds1LFkumDkfbiqokIuS4KZQQLN6TgcQPg82IqrsnvtDP83Umrfbd6XcyxwvVion9_Q7lLLijCWphz6XzWTk31tUOtW0uAA_BmYJJAXyoBDTd3USL6itznZ7283H7GWjlBzOT19LWE4J2Q5mfSfk6D1HsGn4Fb4Gh8QUkx8Wg0k-FOCwUb-_CWfoVOOuZN6dKgal3tuUc0nInZiG3UwJ7XL7scr9s3xCtyoAohceSre0Ezy5rwCQo-qO1Uq9meXA2ebX-WwSirU9nWRqYVlIE5lfgIIMdat-hrq47z4nrM3I-iXtrCjmTjL1Ox2FLdmLH37R9y_qEbCTJGNKxmqmuovu4gB1KHk3WNa7-J7QCnyfyUlO5_sVudUDKSQomZ1QZ432N3mXDX8nzIEhjLtiQF3g3FKb2w_syAgcHPzd_9xh-TJ-uWQtj02-OfTzgft59P6FyGSnr8Z204kCz4BaF34cmDlIzPMrc6M2e2qxS0koktRFyFPFTOcHAkXYMI6iJ23f9bYBBuX8iwIS8yGg0OaD9_Om_v78qwaq7z79ftDmEFfqdUz_FLhqdXm244MIM9JA7Wv2FNkmlWv8bDOP1lODXA5Tsd_1cOTDUmfpwJkHsUqweRaXGDrVeZxbeEmyiRUB7GgUR4_DekLgx_JOblkBTvpphhJzmTwMSdCc_Qdy7al4Sjfl-7NB-uxeAryc1HuEtYq-7-wm4L1IC-_nj4KBxWY0_b0hP1DhjlxNc3QYdJy4sWWoSCEk7YE1SRcj6c1EDMuhpRFHwII81_hGOHrjXefSPMItFrKPuA-61QATy0v3kVcTbjT1ZXEdUPik-DBc3eHx6geY9nCzbHQdcjsStna2bB9YeZxU8roQlEl3-c9KuAeRwkcyJ7BpV01TxfPizGLlBsc0Hu7dqvvaUmzTZNA45eTCjSIfsMmm9DzIs4AoNbASKB65mIHEvl106pVrcblaaWhMlxuFGOd-rARdoJmpESXNCOb6I_aHkwBE6xJk9I8nVIcoiZG9_n2DZsoeRUEF5NMXieJWpxs7kt0krG4PRh12NgLE0WancRzOo8mAH_dWs_n6XySOqT9Y74h3fr9C-CjSI_QqtmkcUbjOuq2HYUpxZyDH1FDuq2Sj4wuopAQRgo2wf7PaHkMnlYpV4jDQcPgh1CpAptvrFHQzzQayZP_a-1-_YR9IijllA1tKNI6Wp3qV5LcCbf6xOSlM7_kNtbaeWcm4Z60zIy5vzAFLkWynJ8u1DFnibdS0N_dDRrP021cr6Z_kKnvNy4kkrJeXr2XuyvOdDCpIluXfAmcwfy8g2mGcLmIrw2gDOoFtXF1Lgm6xYEPZSYg5ynpzHjkqoXo3nznh5hGlD0ZUW0IniFTGZxTD55utDj7vOAyWI__pzHj2nZVNTXqfK9fVOoXabNu3TBBY5AXf1sUoMz2Gir8RBVNNYecX_PG0YB7FdlRdT9fSsIKqrr42LzanEgiRJgDWCdu8UKNtR_NdPqS6zeKDRbP08uS0ukg5pRxX2M4Pwp1MPqlfBeyIqv8-DMEJD_3pEN6yJfufQ29tgrFL-qzyGqlDDYi7Aym9HUKswi6cPzGMeLy0j2w2FfGXXt-I6348cVbEi7Ay_6pfqeE0h62BIDZNHQNvHh-i0WKPGtBvpMyRiDy9-PPqDYDgCrVrJOwinI2SaTw6RrG3VFao5wZKM6_8NYgq23dxPMAKzz0hHL1qFzdw_jETVDWR4xoogH5VV5e1cTnQ8JWAbUfIpcXjdKsGx7uIevSuVOmeiPdpAIneDRFsnWmwu0L_JabqpPIqfZctYQcnQT0hShhf5PUJTIL35v9Xhsf1jgkpuVE0uKj3sEpVxVUyehW2MxJ9fsOyLh5mtY8Ck11Me-B2iKWxQNVut0IGZz-j1HaXOzcplo9c6C09lfzdTqpCUkyVXmxH5Qqd-Ef9t0HbEyMWTW9CxC4_pXpNccqdz5NfuC5zpPg-OjCyqn6bk7Lxeoq0fO4Wg-y63C6JtWY-y4c8yyTBZXsHSIhs00ha7h2wUOUf1DgEZvjd7R2-pfPXB58y0uFgvP5fTIwAK5AYVqNnDdlH1goclFAm9edRa7wuc1No6nJ62t4vmiL_Sd_-w3kiCP-K9jHJS1hgbGEHvOT4UrnFyYjJNGALBUZ_jrZyCSm2wfvH5gvTRrP4mviOddzcRBSJ_Vkj7uK-FYSLpVvVhiU5BqnAJ-Gk6RiR7MeH4vNrSzKTdNTM60Sn16xHYTmSUaISvG4W4A';
  const auth = setContext((operation, context) => ({
    headers: {
      Authorization: `Bearer ${token}`
    },
  }));

  const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);
  const cache = new InMemoryCache();

  return {
    link,
    cache
  }
}

@NgModule({
  exports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: provideApollo,
    deps: [HttpLink]
  }]
})
export class GraphQLModule {}