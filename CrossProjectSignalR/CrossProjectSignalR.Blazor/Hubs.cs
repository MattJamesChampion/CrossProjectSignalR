using Microsoft.AspNetCore.SignalR;

namespace CrossProjectSignalR.Blazor;

public class SeparateBlazorChatHub : Hub
{
    public async Task SendMessage(string? user, string? message)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }
}