using System.Collections.Generic;

namespace Persistencia.DapperConexion.Paginacion
{
    public class PaginacionModel
    {
        public List<IDictionary<string, object>> ListaRecords {get;set;}
        //[{"cursoId": "123123", "titulo":"Curso .NEt"}]
        public int TotalRecords {get;set;}
        public int NumeroPaginas{get;set;}
    }
}