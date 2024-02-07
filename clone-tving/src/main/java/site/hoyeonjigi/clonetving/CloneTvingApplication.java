package site.hoyeonjigi.clonetving;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@EntityScan(
    basePackageClasses = {Jsr310JpaConverters.class},
    basePackages = {"site.hoyeonjigi.clonetving"}
)
@SpringBootApplication
@MapperScan("site.hoyeonjigi.clonetving.mapper")
public class CloneTvingApplication {
	public static void main(String[] args) {
		SpringApplication.run(CloneTvingApplication.class, args);
	}
}
