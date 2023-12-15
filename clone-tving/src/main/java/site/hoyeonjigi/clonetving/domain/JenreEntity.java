package site.hoyeonjigi.clonetving.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Table(name = "jenre")
@Data
@AllArgsConstructor
public class JenreEntity {
    @Id
    private String jenreId;

    @Column(length=20, nullable=false)
    private String jenreName;

}
