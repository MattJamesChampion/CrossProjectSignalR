using Microsoft.AspNetCore.SignalR;

namespace CrossProjectSignalR.MVC;

public class MvcChatHub: Hub
{
    public async Task SendMessage(string? user, string? message)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }
}