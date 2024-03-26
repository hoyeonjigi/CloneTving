package site.hoyeonjigi.clonetving.exception;

public class LackofAuthorityException extends RuntimeException{

    public LackofAuthorityException(){
    }

    public LackofAuthorityException(String s){
        super(s);
    }
}
