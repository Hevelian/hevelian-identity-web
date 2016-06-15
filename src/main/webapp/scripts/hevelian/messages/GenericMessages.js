/**
 * GenericMessages
 * All workers must support: Init, Start, Stop, Pause, Reset, Refresh
 * This file contains the generic messages that can be used without any additional construction required
 */

InitMessage = new DefaultMessage();
InitMessage.header.type = "init";

StartMessage = new DefaultMessage();
StartMessage.header.type = "start";

StopMessage = new DefaultMessage();
StopMessage.header.type = "stop";

PauseMessage = new DefaultMessage();
PauseMessage.header.type = "pause";

ResetMessage = new DefaultMessage();
ResetMessage.header.type = "reset";

RefreshMessage = new DefaultMessage();
RefreshMessage.header.type = "refresh";

