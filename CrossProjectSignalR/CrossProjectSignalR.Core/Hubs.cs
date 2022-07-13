using Microsoft.AspNetCore.SignalR;

//https://docs.microsoft.com/en-us/aspnet/core/blazor/tutorials/signalr-blazor?view=aspnetcore-6.0&tabs=visual-studio&pivots=server#add-a-signalr-hub-1
namespace CrossProjectSignalR.Core;

public interface IChatHub
{
    Task ReceiveMessage(string? user, string? message);
}
    
public class SharedChatHub : Hub<IChatHub>
{
    public async Task SendMessage(string? user, string? message)
    {
        await Clients.All.ReceiveMessage(user, message);
    }
}
