package site.hoyeonjigi.clonetving.configuration;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.jasypt.encryption.pbe.PooledPBEStringEncryptor;
import org.jasypt.encryption.pbe.config.SimpleStringPBEConfig;
import org.junit.jupiter.api.Test;

public class JasyptConfigAESTest {
    @Test
	void stringEncryptor() {
		//test
		String originalString = "abc123";

        String key = "encryptKey_hoyeonjigi";

		PooledPBEStringEncryptor encryptor = new PooledPBEStringEncryptor();
		SimpleStringPBEConfig config = new SimpleStringPBEConfig();

		config.setPassword("encryptKey_hoyeonjigi"); // 암호화키
		config.setAlgorithm("PBEWITHHMACSHA512ANDAES_256"); // 알고리즘
		config.setKeyObtentionIterations("1000"); // 반복할 해싱 회수
		config.setPoolSize("1"); // 인스턴스 pool
		config.setProviderName("SunJCE");
		config.setSaltGeneratorClassName("org.jasypt.salt.RandomSaltGenerator"); // salt 생성 클래스
		config.setIvGeneratorClassName("org.jasypt.iv.RandomIvGenerator");
        config.setStringOutputType("base64"); //인코딩 방식
		encryptor.setConfig(config);

		// 암호화
        String encryptedString = encryptor.encrypt(originalString);
        // 복호화
        String decryptedString = encryptor.decrypt(encryptedString);

        assertEquals(originalString, decryptedString);
	}

}
