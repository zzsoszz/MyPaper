/* form validate */
function Validate(valForm, showArea)
{
    var result = true;
    var controls = valForm.elements;
    //showArea.innerHTML = "";
    for(var i = 0; i < controls.length; i++)
    {
        switch(controls[i].validator)
        {
            case "NotEmpty":
                if(CheckEmpty(controls[i].value))
                {
                    
                    //showArea.innerHTML += ShowMsg(controls[i].errmsg);
                    alertMsg(controls[i].errmsg);
                    return false;
                }
                else
                {
                	if(CheckLength(controls[i].value))
                	{
                		result = false;
                		//showArea.innerHTML += ShowMsg(controls[i].errmsgn);
                		alertMsg(controls[i].errmsg);
                		return false;
                	}
                }
                break;
            case "NotEmptyToo":
                if(CheckEmpty(controls[i].value))
                {
                    result = false;
                    //showArea.innerHTML += ShowMsg(controls[i].errmsg);
                    alertMsg(controls[i].errmsg);
                    return false;
                }
                break;
            case "SameValue":
                for(var j = 0; j < controls.length; j++)
                {
                    if(controls[i].cmpctrl == controls[j].name)
                    {
                        if(!CheckSame(controls[i].value, controls[j].value))
                        {
                            result = false;
                            //showArea.innerHTML += ShowMsg(controls[i].errmsg);
                            alertMsg(controls[i].errmsg);
                            return false;
                        }
                        break;
                    }
                }
                break;
            case "Email":
                if(!CheckEmail(controls[i].value))
                {
                    result = false;
                    //showArea.innerHTML += ShowMsg(controls[i].errmsg);
                    alertMsg(controls[i].errmsg);
                    return false;
                }
                break;
            case "EmptyEmail":
                if(CheckEmpty(controls[i].value) || !CheckEmail(controls[i].value))
                {
                    result = false;
                    //showArea.innerHTML += ShowMsg(controls[i].errmsg);
                    alertMsg(controls[i].errmsg);
                    return false;
                }
                break;
            case "Check":
            	if(CheckSelect(controls[i].checked))
            	{
            		result = false;
            		//showArea.innerHTML += ShowMsg(controls[i].errmsg);
            		alertMsg(controls[i].errmsg);
            		return false;
            	}
            	break;
            case "RegExp":
                break;
            /*case "URL":
                if(!CheckURL(controls[i].value))
                {
                    result = false;
                    showArea.innerHTML += ShowMsg(controls[i].errmsg);
                }
                break;*/
            default:
                break;
        }
    }
    return result;
}

/**/
function ShowMsg(str)
{
	return "<li>" + str + "</li>";
}

function alertMsg(str) {
    alert(str);
}

/* check empty; if empty return true; */
function CheckEmpty(str)
{
    str = Trim(str);
    return (str == "");
}

/**/
function CheckSame(str, cmpstr)
{
    return (str == cmpstr);
}

function CheckSelect(str)
{
	if(str == "false")
	{
		
	}
}

/**/
function CheckEmail(str)
{
    str = Trim(str);
    if(str == "")
        return true;
    var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return reg.test(str);
}

/*function CheckURL(str)
{
	str = Trim(str);
	if(str == "")
		return true;
	var reg = \(\w+(-\w+)*)(\.(\w+(-\w+)*))*(\?\S*)?$;
	return reg.test(str);
}*/

/* left trim */
function LTrim(str)
{
    var whitespace = new String(" \t\n\r");
    var s = new String(str);

    if (whitespace.indexOf(s.charAt(0)) != -1)
    {
        var j=0, i = s.length;
        while (j < i && whitespace.indexOf(s.charAt(j)) != -1)
        {
            j++;
        }
        s = s.substring(j, i);
    }
    return s;
}

/* right trim */
function RTrim(str)
{
    var whitespace = new String(" \t\n\r");
    var s = new String(str);

    if (whitespace.indexOf(s.charAt(s.length-1)) != -1)
    {
        var i = s.length - 1;
        while (i >= 0 && whitespace.indexOf(s.charAt(i)) != -1)
        {
            i--;
        }
        s = s.substring(0, i+1);
    }
    return s;
}

/* trim */
function Trim(str)
{
    return RTrim(LTrim(str));
}

/* length*/
function CheckLength(str)
{
	if (str.length > 20 || str.length < 6)
	{
		return true;
	}
	return false;
}

