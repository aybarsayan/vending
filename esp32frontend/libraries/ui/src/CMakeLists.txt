SET(SOURCES ui_comp_small_label.c
    ui_comp.c
    ui_Splash.c
    ui_Tikla.c
    ui_Select.c
    ui_Get_Info.c
    ui_RFID.c
    ui_Approve.c
    ui_Reject.c
    ui.c
    ui_comp_hook.c
    ui_helpers.c
    ui_events.c
    ui_img_fezalogo2_png.c
    ui_img_pattern_png.c
    ui_img_universal_contactless_card_symbol1_png.c)

add_library(ui ${SOURCES})
