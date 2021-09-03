using Github.InterfacesServices;
using Github.Models.Search;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Github.Services
{
    public class SearchService : ISearchService
    {


        public async Task<List<SearchGithubLiteResult>> GetFromQuery(SearchGithubQuery q)
        {

            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.UserAgent.TryParseAdd("request");
                string myJsonResponse = await client.GetStringAsync($"https://api.github.com/search/repositories?q={q.Query}");
                SearchGithubResult res = JsonConvert.DeserializeObject<SearchGithubResult>(myJsonResponse);
                List<SearchGithubLiteResult> searchResults = res.items.Select(r => new SearchGithubLiteResult() { Url = r.url, Desc = r.description, Id = r.id, Name = r.name }).ToList();
                return searchResults;

            }



        }
    }
}
