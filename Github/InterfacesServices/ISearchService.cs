using Github.Models.Search;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Github.InterfacesServices
{
    public interface ISearchService
    {
        Task<List<SearchGithubLiteResult>> GetFromQuery(SearchGithubQuery q);
    }
}
