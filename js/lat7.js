// initialize array for fields and add 1 new default field
var listNumberFields = ["<input type='text' name='number1' class='number_field' placeholder='number 1'> <br><br>"];

function myMathObject()
{
    this.addNumber = function(first_number, second_number)
    {
        var additionResult = Number(first_number) + Number(second_number);
        return additionResult;
    }

    this.multiplyNumber = function(first_number, second_number)
    {
        var multiplicationResult = Number(first_number) * Number(second_number);
        return multiplicationResult;
    }

    this.divideNumber = function(first_number, second_number)
    {
        var divisionResult = Number(first_number) / Number(second_number);
        return divisionResult;
    }

    this.substractNumber = function(first_number, second_number)
    {
        var substractionResult = Number(first_number) - Number(second_number);
        return substractionResult;
    }
}


function showNumberField()
{
    // get html element with id list_number_field
    var listNumberFieldElement = document.getElementById("list_number_field");
    listNumberFieldElement.innerHTML = "";

    for(let counter = 0; counter < listNumberFields.length; counter++)
    {
        var numberField = listNumberFields[counter]
        listNumberFieldElement.innerHTML += numberField;
    }
}


function addNewField()
{
    var fieldNumber = listNumberFields.length + 1;
    var newNumberField = "<input type='text' name='number" +  fieldNumber + "' class='number_field' placeholder='number " + fieldNumber + "'> <br><br>";
    listNumberFields[listNumberFields.length] = newNumberField;
    showNumberField();
}


function countResult(user_input_list, math_operation)
{
    // initialize default result as 0 and create object of myMathObject
    var yourResult = null;
    var mathObject = new myMathObject();

    switch (math_operation)
    {
        case "+":
            for (let counter = 0; counter < user_input_list.length; counter++)
            {
                yourResult = mathObject.addNumber(user_input_list[counter].value, yourResult);
            }
            break;
        case "-":
            for (let counter = 0; counter < (user_input_list.length - 1); counter++)
            {
                yourResult = mathObject.substractNumber(
                    (counter == 0) ? user_input_list[counter].value : yourResult,
                    user_input_list[counter+1].value
                );
            }
            break;
        case "x":
            for (let counter = 0; counter < user_input_list.length; counter++)
            {
                yourResult = mathObject.multiplyNumber(
                    user_input_list[counter].value,
                    (yourResult === null) ? 1 : yourResult
                );
            }
            break;
        case ":":
            for (let counter = 0; counter < user_input_list.length; counter++)
            {
                yourResult = mathObject.divideNumber(
                    (yourResult === null) ? user_input_list[counter].value : yourResult,
                    (counter == 0) ? 1 : user_input_list[counter].value
                );
            }
            break;
        default:
            alert("invalid math operation!");
    }

    return yourResult;
}


function processForm()
{
    // get input from user and create arrow function for filtering input
    var mathOperation = document.querySelector("select[name=math_operation]").value;
    var userNumberInputs = document.getElementsByClassName("number_field");
    var filterInput = (user_number_input) => (Number(user_number_input) == user_number_input);

    // filter user input
    var isAllNumber = null;
    for(let counter = 0; counter < userNumberInputs.length; counter++)
    {
        if (!filterInput(userNumberInputs[counter].value))
        {
            alert("input must be number!");
            isAllNumber = false;
            break;
        }
        else
        {
            isAllNumber = true;
        }
    }

    // count and show result
    if (isAllNumber === true)
    {
        var yourResult = countResult(userNumberInputs, mathOperation);

        if (!(yourResult == null))
            alert("your result is " + yourResult)
    }
}


function httpAuth()
{
    // defined variable for valid credentials and loop counter
    var loopCounter = true;
    var correctUserNameList = ["admin", "user"];
    var correctPassWordList = ["gkdipassword", "12345678"];

    while (loopCounter)
    {
        // get user credentials from user input
        var userName = prompt("username");
        var passWord = prompt("password");

        if (correctUserNameList.includes(userName))
        {
            if (userName == correctUserNameList[0])
            {
                if (passWord == correctPassWordList[0])
                {
                    showNumberField();
                    break;
                }
                else
                {
                    alert("invalid password for " + userName);
                }
            }
            else if (userName == correctUserNameList[1])
            {
                if (passWord == correctPassWordList[1])
                {
                    showNumberField();
                    break;
                }
                else
                {
                    alert("invalid password for " + userName);
                }
            }
        }
        else
        {
            alert("username does not exist!");
        }
    }
}

httpAuth();
