using Github.InterfacesServices;
using Github.Models.Search;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Github.Controllers
{
    [Route("api/[controller]")]
    [ApiController]    
    public class SearchController : ControllerBase
    {
        ISearchService _searchService;
        public SearchController(ISearchService ISearchService)
        {
            _searchService = ISearchService;
        }

        [Authorize]
        [HttpPost("search")]
        public async Task<IActionResult> Search(SearchGithubQuery query)
        {
            List<SearchGithubLiteResult> result = await _searchService.GetFromQuery(query);
            return Ok(result);
        }

    }
}
