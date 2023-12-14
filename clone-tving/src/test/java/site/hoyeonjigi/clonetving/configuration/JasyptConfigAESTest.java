package site.hoyeonjigi.clonetving.configuration;

import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.jasypt.iv.RandomIvGenerator;
import org.junit.jupiter.api.Test;

public class JasyptConfigAESTest {
    @Test
	void stringEncryptor() {
        //db_url
		String url = ""; 
        //db_username
		String username = "";
        //db_password
		String password = "";

        String key = "";

		System.out.println(jasyptEncoding(url, key));
		System.out.println(jasyptEncoding(username, key));
		System.out.println(jasyptEncoding(password, key));
	}

	public String jasyptEncoding(String value, String key) {

		StandardPBEStringEncryptor pbeEnc = new StandardPBEStringEncryptor();
		pbeEnc.setAlgorithm("PBEWITHHMACSHA512ANDAES_256");
		pbeEnc.setPassword(key);
		pbeEnc.setIvGenerator(new RandomIvGenerator());
		return pbeEnc.encrypt(value);
	}
}
