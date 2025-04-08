using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CartController : BaseApiController
{
    private readonly ICartService _cartService;

    public CartController(ICartService cartService)
    {
        _cartService = cartService;
    }

    [HttpGet]
    public async Task<ActionResult<ShoppingCart>> GetCartById(string key)
    {
        var cart = await _cartService.GetCartAsync(key);
        return Ok(cart ?? new ShoppingCart { Id = key });
    }

    [HttpPost]
    public async Task<ActionResult<ShoppingCart>> UpdateCart(ShoppingCart cart)
    {
        var updatedCart = await _cartService.SetCartAsync(cart);
        if (updatedCart == null) return BadRequest("Problem updating cart");
        return Ok(updatedCart);
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteCart(string key)
    {
        var result = await _cartService.DeleteCartAsync(key);
        if (!result) return BadRequest("Problem deleting cart");
        return Ok();
    }

}
