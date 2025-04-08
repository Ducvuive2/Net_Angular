namespace Core.Entities;

public class ShoppingCart : BaseEntity
{
    public string Id { get; set; }
    public List<CartItem> Items { get; set; } = [];
}
