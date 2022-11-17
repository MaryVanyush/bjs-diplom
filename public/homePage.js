const logoutButton = new LogoutButton();

logoutButton.action = () =>{
    ApiConnector.logout((response) =>{
        if(response.success){
            location.reload();
        }
    })
};

const ratesBoard = new RatesBoard();

const funcGetStocks = () => {
    ApiConnector.getStocks((response) => {
        if(response.success){
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    })
}
funcGetStocks();
setInterval(() => funcGetStocks(), 60000);

const currentUser = () => {
    ApiConnector.current(response =>{
        if(response.success){
            ProfileWidget.showProfile(response.data);
        }
    })
}
currentUser();

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data,(response) => {
        if( response.success === false){
            moneyManager.setMessage(false, response.error);
            return;
        } 
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(true, 'Баланс успешно пополнен');
    })
}

moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, (response) => {
        if( response.success === false){
            moneyManager.setMessage(false, response.error);
            return;
        } 
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(true, 'Конвертация выполнена');
    })
}

moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, (response) => {
        if( response.success === false){
            moneyManager.setMessage(false, response.error);
            return;
        } 
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(true, 'Перевод выполнен');
    })
}

const favoritesWidget = new FavoritesWidget();

const favoritesUsers = () => {
    ApiConnector.getFavorites((response) => {
        if(response.success){
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        }
    })
}
favoritesUsers();

favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, (response) => {
        if(response.success === false){
            favoritesWidget.setMessage(false, response.error);
            return;
        }
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    })
}

favoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    })
}
