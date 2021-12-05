  // Selecionando camps de seleção
  var fMoney = document.getElementById('fCurrency'); // var firstMoneySelect = fSelect.options.selectedIndex;
  var sMoney = document.getElementById('sCurrency');
  
  // Mapeando cada moeda para as respectivas opções de moeda  
  var mapCurrency = {
        "BRL": [ {"name": "Dólar (USD)","value": "USD"}, {"name": "Euro (EUR)", "value":"EUR"}],
        "USD": [ {"name": "Real (BRL)", "value": "BRL"}, {"name": "Euro (EUR)", "value":"EUR"}],
        "EUR": [ {"name": "Real (BRL)", "value": "BRL"}, {"name": "Dólar (USD)", "value": "USD"}],
        "BTC": [ {"name": "Real (BRL)", "value": "BRL"}, {"name": "Dólar (USD)", "value":"USD"}, {"name": "Euro (EUR)", "value":"EUR"}] 
      };

  //criando a "option"
  function createOption(name, value) {
      var newOption = document.createElement("option");
      newOption.text = name;
      newOption.value = value;
      return newOption;
  };
  
  function updateSecondCurrency() {
      sMoney.innerHTML = "";
      sMoney.removeAttribute("disabled");
    
      var money1 = fMoney.value;

      if (money1 == "nenhum") {
        sMoney.setAttribute("disabled", "");
      } else if (mapCurrency[money1]) {
        sMoney.options.add(createOption("Selecione uma moeda", ""));
        for (var money2 of mapCurrency[money1]) {
          sMoney.options.add(createOption(money2.name, money2.value));
        };
      };
  }
  
  document.addEventListener('keypress', function(e){
    if(e.which == 13){
      convert();
    }
  }, false);
  
  function convert() {
    // Pegando valor inserido no input "moneyReal"
    var input = document.getElementById('moneyValue')
    var valueMoney = parseFloat(input.value) //pegando o valor e transformando em número
    
    // Ver qual opção está selecionada no selects
    var fSelect = document.getElementById('fCurrency').value;// var firstMoneySelect = fSelect.options.selectedIndex;
    var sSelect = document.getElementById('sCurrency').value;
    
  //Usando Api awesomeapi.com.br
    var requestURL = "https://economia.awesomeapi.com.br/last/" + fSelect + "-" + sSelect;
    var request = new XMLHttpRequest();
    request.open("GET", requestURL);
    request.responseType= "json";
    request.send();
    request.onload = function () {
      if (input.value == "") {
        alert("Preencha o campo com um valor!")
      } else if (sSelect == ""){
        alert("Selecione uma moeda")
      } else {
        var join = fSelect + sSelect;
        var realToDolar = parseFloat(request.response[join].high);
        var result = symbol + (valueMoney * realToDolar).toFixed(2) + "";
         // Selecionando o campo para colocar a resposta
        var resultField = document.getElementById("convertedValue");
        resultField.innerHTML = result.replace(".",",");
      }; 
     
    };
     
     var symbol = "" 
     if (sSelect == "BRL"){
      symbol = "R$ "
    } else if (sSelect == "USD") {
      symbol = "U$ "
    } else if (sSelect == "EUR") {
      symbol = "€ "
    };
      
      
  };