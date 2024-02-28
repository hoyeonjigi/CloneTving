package site.hoyeonjigi.clonetving.exception;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(){
    }

    public UserNotFoundException(String s){
        super(s);
    }
}
