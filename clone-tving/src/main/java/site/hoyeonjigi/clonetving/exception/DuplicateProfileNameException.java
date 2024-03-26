package site.hoyeonjigi.clonetving.exception;

public class DuplicateProfileNameException extends RuntimeException{
    public DuplicateProfileNameException(String s){
        super(s);
    }

    public DuplicateProfileNameException(){
    }
}
