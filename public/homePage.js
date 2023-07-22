'use strict'



let logoutButton = new LogoutButton();
logoutButton.action = () => {
    ApiConnector.logoutBtn((response) => {
        if (response.success) {
            location.reload();
        }
    });
}

ApiConnector.current((response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
})

let ratesBoard = new RatesBoard();
ratesBoard.getCurrencyValue = () => {
    ApiConnector.getStocks((response) => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    })
}

ratesBoard.getCurrencyValue();
setInterval(ratesBoard.getCurrencyValue, 60000);

let moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Деньги зачислены')
        } else {
            moneyManager.setMessage(response.success, response.error)
        }
    });
}

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Конвертация прошла успешно')
        } else {
            moneyManager.setMessage(response.success, response.error)
        }

    });
}

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Деньги переведены')
        } else {
            moneyManager.setMessage(response.success, response.error)
        }
    });
}

let favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
})

favoritesWidget.addUserCallback = (id) => {
    ApiConnector.addUserToFavorites(id, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            moneyManager.setMessage(response.success, 'Пользователь добавлен в избранное')
        } else {
            moneyManager.setMessage(response.success, response.error)
        }
    })
}

favoritesWidget.removeUserCallback = (id) => {
    ApiConnector.removeUserFromFavorites(id, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            moneyManager.setMessage(response.success, 'Пользователь удален из избранного')
        } else {
            moneyManager.setMessage(response.success, response.error)
        }
    })
}







