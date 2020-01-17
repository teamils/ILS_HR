package com.example.demo.Entity;

import lombok.*;
import javax.persistence.*;


@Entity
@Data
@Setter
@Getter
@NoArgsConstructor
@EqualsAndHashCode
public class MasterRole {
    @Id
    @SequenceGenerator(name = "MasterRole_seq", sequenceName = "MasterRole_seq",initialValue = 1, allocationSize = 1)
    @GeneratedValue(generator ="MasterRole_seq")
    private long id;
    private String masterRoleName;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getMasterRoleName() {
        return masterRoleName;
    }

    public void setMasterRoleName(String masterRoleName) {
        this.masterRoleName = masterRoleName;
    }
}
