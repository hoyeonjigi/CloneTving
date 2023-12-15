package site.hoyeonjigi.clonetving.domain;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Table(name = "user")
@Data
@AllArgsConstructor
public class UserEntity {
    
    @Id
    private String userId;

    @Column(length = 30, nullable=false)
    private String userPassword;

    @Column(length = 100, nullable=false)
    private String userEmail;

    @Column(nullable=false)
    private boolean adultStatus;

    @Column(nullable=false)
    private boolean privacyAgreement;

    @Column(nullable=false)
    private boolean smsAgreement;

    @Column(nullable=false)
    private boolean emailAgreement;

    @OneToMany(mappedBy = "userEntity", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<ProfileEntity> profiles = new ArrayList<ProfileEntity>();

}
